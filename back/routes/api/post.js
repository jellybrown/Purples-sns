import "@babel/polyfill";
import express from "express";
import multer from "multer";
import multerS3 from "multer-s3";
import path from "path";
import AWS from "aws-sdk";
import moment from "moment";
import dotenv from "dotenv";

import Post from "../../models/post";
import Comment from "../../models/comment";
import User from "../../models/user";
import Follow from "../../models/follow";
import auth from "../../middleware/auth";

// express router를 생성한다. (이 라우터를 express object에서 사용한다.)
const router = express.Router();

// .env 파일의 설정 정보를 읽는다.
dotenv.config();
// AWS s3에 액세스하기 위해 key 정보를 .env에서 읽어와 오브젝트화 한다.
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_PRIVATE_KEY,
});

// multer object로 S3 Bucket에 업로드하기 위한 준비를 한다.
const uploadS3 = multer({
  storage: multerS3({
    s3,
    bucket: "purples/upload", // 버킷 및 디렉터리 정보 (S3 repository 단위)
    region: "ap-northeast-2", // 리전 정보 (S3 Bucket region)
    key(req, file, cb) {
      const ext = path.extname(file.originalname);
      const basename = path.basename(file.originalname, ext);
      // 업로드하는 파일에 현재 날짜시간 정보를 붙여서 업로드한다.
      cb(null, basename + new Date().valueOf() + ext);
    },
  }),
  limits: { fileSize: 100 * 1024 * 1024 }, // 파일 용량 제한 (100Mb)
});

/*
  @route    GET   api/post
  @desc     All Post (전체 포스트 정보)
  @access   Public
 */
router.get("/", async (req, res, next) => {
  try {
    // MongoDB의 Posts collection 도큐먼트 수
    const postCount = await Post.countDocuments();
    const postFindResult = await Post.find()
      .populate("writer", "name")
      .populate("comments")
      .populate({
        path: "comments",
        populate: { path: "writer" },
      })
      .sort({ date: -1 });
    // 결과 값으로 읽어온 포스트 정보, 전체 포스트 수를 담아 응답한다.
    const result = { postFindResult, postCount };

    return res.json(result); // 찾은 Post Document를 결과값으로 응답.
  } catch (e) {
    console.error(e);
    next(e);
  }
});

/*
  @route    GET   api/post/skip
  @desc     포스트 정보를 가져오기 위한 API
  @access   public
 */
router.get("/skip", async (req, res) => {
  try {
    // MongoDB의 Posts collection 도큐먼트 수
    const postCount = await Post.countDocuments();

    console.log("skip API req.query is ", req.query);
    let postFindResult;
    if (req.query.filter === "All") {
      // Request Parameter로 받은 skip 수만큼 skip 후,
      // Post 정보를 읽어온다. (6개 제한)
      postFindResult = await Post.find()
        .populate("writer", "name")
        .populate("comments")
        .populate({
          path: "comments",
          populate: { path: "writer" },
        })
        .skip(Number(req.query.skip))
        .limit(6)
        .sort({ date: -1 });
    } else if (req.query.filter === "Followings") {
      const followingUsers = await Follow.find({ user: req.query.userId })
        .select({ follow: 1, _id: 0 })
        .lean();
      const followingsData = followingUsers.map((data) => data.follow);

      postFindResult = await Post.find({ writer: { $in: followingsData } })
        .populate("writer", "name")
        .populate("comments")
        .populate({
          path: "comments",
          populate: { path: "writer" },
        })
        .skip(Number(req.query.skip))
        .limit(6)
        .sort({ date: -1 });
    } else if (req.query.filter === "Followers") {
      const followerUsers = await Follow.find({ follow: req.query.userId })
        .select({ user: 1, _id: 0 })
        .lean();
      const followerData = followerUsers.map((data) => data.user);

      postFindResult = await Post.find({ writer: { $in: followerData } })
        .populate("writer", "name")
        .populate("comments")
        .populate({
          path: "comments",
          populate: { path: "writer" },
        })
        .skip(Number(req.query.skip))
        .limit(6)
        .sort({ date: -1 });
    } else if (req.query.filter === "My") {
      postFindResult = await Post.find({ writer: req.query.userId })
        .populate("writer", "name")
        .populate("comments")
        .populate({
          path: "comments",
          populate: { path: "writer" },
        })
        .skip(Number(req.query.skip))
        .limit(6)
        .sort({ date: -1 });
    }

    // 결과 값으로 읽어온 포스트 정보, 전체 포스트 수를 담아 응답한다.
    const result = { postFindResult, postCount };
    res.json(result);
  } catch (e) {
    console.log(e);
    res.json({ msg: "포스트가 없습니다." });
  }
});

/*
  @route    POST    api/post
  @desc     포스트 생성 API, auth와 uploadS3를 미들웨어로 사용. (이미지 파라미터 이름은 image[]로 받으며, uploadS3를 통해 S3 이미지 업로드를 진행)
  @access   Private
 */
router.post("/", auth, uploadS3.array("image[]", 5), async (req, res, next) => {
  try {
    // AWS S3에 업로드한 이미지 파일들의 URL 정보를 출력 확인. (uploadS3 미들웨어를 통해 이미지는 올라간 상태)
    console.log(req.files.map((v) => v.location));
    const imageUrls = req.files.map((v) => v.location);
    const { contents, writer } = req.body; //request body에서 contents(포스트 내용)과 writer(작성자) 정보를 받아온다.

    // MongoDB에 post document 생성
    const post = await Post.create({
      contents,
      imageUrls,
      writer,
    });

    // MongoDB 사용자 Document 정보에 글쓴이의 작성 post id 추가
    await User.findByIdAndUpdate(req.user.id, {
      $push: { posts: post._id },
    });

    // 저장된 document에 대해 json 응답.
    return res.json(post);
  } catch (e) {
    console.error(e);
  }
});

/*
  @route    GET   api/post/:id
  @desc     Detail Post (포스트 상세 정보)
  @access   Public
 */
router.get("/:id", async (req, res, next) => {
  try {
    // post id를 가지고 MongoDB Posts collection에서 Document를 찾는다.
    // populate를 통해 작성자 이름정보를 함께 읽어온다.
    const post = await Post.findById(req.params.id).populate("writer", "name");
    post.save();

    console.log("Detail Post: ", post);
    return res.json(post); // 찾은 Post Document를 결과값으로 응답.
  } catch (e) {
    console.error(e);
    next(e);
  }
});

/*
  @route    GET   api/post/comments
  @desc     Get All Comments (포스트 댓글 정보 조회)
  @access   public
 */
router.get("/:id/comments", async (req, res) => {
  try {
    // 댓글을 찾기 위해 먼저 Posts Collection을 검색하고, populate로 comments 정보를 읽어온다. (comment model 정보로 매핑)
    const comment = await Post.findById(req.params.id).populate({
      path: "comments",
    });
    const result = comment.comments;
    console.log(result, "comment load");
    res.json(result); // 결과값으로 댓글 정보 JSON 응답
  } catch (e) {
    console.log(e);
  }
});

/*
  @route    POST   api/post/:id/comments
  @desc     Create a comment (댓글 생성)
  @access   Public
 */
router.post("/:id/comments", async (req, res, next) => {
  // Comment model에 필요한 정보를 Request에서 읽어온다.
  const { contents, userId, userName, id } = req.body;
  let comment = await Comment.create({
    contents,
    writer: userId,
    writerName: userName,
    post: id,
    date: moment().format("YYYY-MM-DD HH:mm:ss"),
  });
  comment = await comment.populate("writer").execPopulate();

  try {
    // 생성한 Comment 모델의 id를 Post Document 안에 추가한다.
    await Post.findByIdAndUpdate(id, {
      $push: {
        comments: comment._id,
      },
    });

    // User Document 안에 댓글 ID와 포스트 ID를 추가한다.
    await User.findByIdAndUpdate(userId, {
      $push: {
        comments: {
          post_id: id,
          comment_id: comment._id,
        },
      },
    });

    // 댓글 모델을 JSON 형태로 응답한다.
    res.json(comment);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

/*
  @route    Delete    api/post/:id
  @desc     Delete a post
  @access   Private
 */
router.delete("/:id", auth, async (req, res) => {
  await Post.deleteMany({ _id: req.params.id }); // Post Document를 삭제한다.
  await Comment.deleteMany({ post: req.params.id }); // Comment Document를 삭제한다.
  // User Document에서 Post와 Comment 정보를 삭제한다.
  await User.findByIdAndUpdate(req.user.id, {
    $pull: {
      posts: req.params.id,
      comments: { post_id: req.params.id },
    },
  });

  // 성공 정보를 응답한다. (JSON)
  return res.json({ success: true });
});

/*
  @route    GET   api/post/:id/edit
  @desc     Edit Post (GET)
  @access   Private
 */
router.get("/:id/edit", auth, async (req, res, next) => {
  try {
    // 포스트 정보를 수정하기 위해 찾고자 하는 Post Document를 응답한다. (JSON)
    const post = await Post.findById(req.params.id).populate("writer", "name");
    res.json(post);
  } catch (e) {
    console.error(e);
  }
});

/*
  @route    POST  api/post/:id/edit
  @desc     Edit Post (POST)
  @access   Private
 */
router.post("/:id/edit", auth, async (req, res, next) => {
  // 수정하고자 하는 내용과 이미지 URL 정보를 request에서 꺼낸다.
  const {
    body: { contents, imageUrls, id },
  } = req;

  try {
    // Post document를 수정한다.
    const modified_post = await Post.findByIdAndUpdate(
      id,
      {
        contents,
        imageUrls,
        date: moment().format("YYYY-MM-DD HH:mm:ss"),
      },
      { new: true }
    );

    console.log(modified_post, "edit modified");
    res.redirect(`/api/post/${modified_post}`);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

/*
  @route    POST  api/post/search/:searchTerm
  @desc     Search post
  @access   Private
 */
router.get("/search/:searchTerm", auth, async (req, res, next) => {
  try {
    console.log(req.params.searchTerm);
    const result = await Post.find({
      contents: {
        $regex: req.params.searchTerm,
        $options: "i",
      },
    }).populate({ path: "posts" });
    console.log("search post ", result);
    res.send(result);
  } catch (e) {
    console.log(e);
    next(e);
  }
});

export default router;
