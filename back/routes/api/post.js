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
import auth from "../../middleware/auth";

const router = express.Router();
dotenv.config();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_PRIVATE_KEY,
});

const uploadS3 = multer({
  storage: multerS3({
    s3,
    bucket: "purples/upload",
    region: "ap-northeast-2",
    key(req, file, cb) {
      const ext = path.extname(file.originalname);
      const basename = path.basename(file.originalname, ext);
      cb(null, basename + new Date().valueOf() + ext);
    },
  }),
  limits: { fileSize: 100 * 1024 * 1024 }, // 100Mb
});

/*
  @route  POST  api/post/image
  @desc   Create a post image
  @access Private
 */
router.post("/image", uploadS3.array("upload", 5), async (req, res) => {
  try {
    console.log(req.files.map((v) => v.location));
    res.json({ uploaded: true, url: req.files.map((v) => v.location) });
  } catch (e) {
    console.error(e);
    res.json({ uploaded: false, url: null });
  }
});

/*
  @route    GET   api/post
  @desc     More Loading Posts
  @access   public
 */
router.get("/skip/:skip", async (req, res) => {
  try {
    const postCount = await Post.countDocuments();
    const postFindResult = await Post.find()
      .skip(Number(req.params.skip))
      .limit(6)
      .sort({ date: -1 });
    const result = { postFindResult, postCount };
    res.json(result);
  } catch (e) {
    console.log(e);
    res.json({ msg: "포스트가 없습니다." });
  }
});

/*
  @route    POST    api/post
  @desc     Create a post
  @access   Private
 */
router.post("/", auth, uploadS3.array("image", 5), async (req, res, next) => {
  try {
    console.log("req.body.image", req.body.image);
    console.log(req.files.map((v) => v.location));
    const imageUrls = req.files.map((v) => v.location);
    const { contents, writer } = req.body;

    // post 생성
    const post = await Post.create({
      contents,
      imageUrls,
      writer,
    });

    // 사용자 정보에 post 추가
    await User.findByIdAndUpdate(req.user.id, {
      $push: { posts: post._id },
    });

    return res.redirect(`/api/post/${post._id}`);
  } catch (e) {
    console.error(e);
  }
});

/*
  @route    GET   api/post/:id
  @desc     Detail Post
  @access   Public
 */
router.get("/:id", async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).populate("writer", "name");
    post.save();

    console.log(post);
    res.json(post);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

/*
  @route    GET   api/post/comments
  @desc     Get All Comments
  @access   public
 */
router.get("/:id/comments", async (req, res) => {
  try {
    const comment = await Post.findById(req.params.id).populate({
      path: "comments",
    });
    const result = comment.comments;
    console.log(result, "comment load");
    res.json(result);
  } catch (e) {
    console.log(e);
  }
});

/*
  @route    GET   api/post/:id/comments
  @desc     Get All Comments
  @access   Public
 */
router.post("/:id/comments", async (req, res, next) => {
  const { contents, userId, userName, id } = req;
  const comment = await Comment.create({
    contents: contents,
    writer: userId,
    writerName: userName,
    post: id,
    date: moment().format("YYYY-MM-DD hh:mm:ss"),
  });
  console.log(comment, "comment");

  try {
    await Post.findByIdAndUpdate(id, {
      $push: {
        comments: comment._id,
      },
    });

    await User.findByIdAndUpdate(userId, {
      $push: {
        comments: {
          post_id: id,
          comment_id: comment._id,
        },
      },
    });

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
  await Post.deleteMany({ _id: req.params.id });
  await Comment.deleteMany({ post: req.params.id });
  await User.findByIdAndUpdate(req.user.id, {
    $pull: {
      posts: req.params.id,
      comments: { post_id: req.params.id },
    },
  });

  return res.json({ success: true });
});

/*
  @route    GET   api/post/:id/edit
  @desc     Edit Post
  @access   Private
 */
router.get("/:id/edit", auth, async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).populate("writer", "name");
    res.json(post);
  } catch (e) {
    console.error(e);
  }
});

router.post("/:id/edit", auth, async (req, res, next) => {
  console.log(req, "api/post/:id/edit");
  const {
    body: { contents, imageUrls, id },
  } = req;

  try {
    const modified_post = await Post.findByIdAndUpdate(
      id,
      {
        contents,
        imageUrls,
        date: moment().format("YYYY-MM-DD hh:mm:ss"),
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

export default router;
