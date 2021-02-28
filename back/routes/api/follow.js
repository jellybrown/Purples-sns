import express from "express";
import Follow from "../../models/follow";
import auth from "../../middleware/auth";
import User from "../../models/user";
import moment from "moment";

// express router를 생성한다. (이 라우터를 express object에서 사용한다.)
const router = express.Router();

// @routes    GET api/follow/getFollowingList
// @desc      Get following list
// @access    private
router.get("/getFollowingList", auth, async (req, res) => {
  try {
    // MongoDB에서 Follows collection의 데이터를 읽어온다. (사용자가 팔로우하고 있는 데이터)
    const following = await Follow.find({
      user: req.user.id,
    });

    // 200code(success)와 함께 팔로잉 데이터 응답.
    res.status(200).json(following);
  } catch (e) {
    console.log(e);
    res.status(400).json({ msg: e.message });
  }
});

// @routes    GET api/follow/getFollowerList
// @desc      Get follower list
// @access    private
router.get("/getFollowerList", auth, async (req, res) => {
  try {
    // MongoDB에서 Follows collection의 데이터를 읽어온다. (사용자를 팔로우하고 있는 데이터)
    const follower = await Follow.find({
      follow: req.user.id,
    });

    // 200code(success)와 함께 팔로워 데이터 응답.
    res.status(200).json(follower);
  } catch (e) {
    console.log(e);
    res.status(400).json({ msg: e.message });
  }
});

// @routes    POST api/follow/addFollow
// @desc      Add follow
// @access    private
router.post("/addFollow", auth, async (req, res) => {
  try {
    // Request Body에서 followUserEmail을 가져온다. (팔로잉할 유저)
    const { followUserEmail } = req.body;

    // MongoDB Users collection에서 팔로잉할 유저 이메일과 일치하는 데이터를 찾는다.
    await User.findOne({
      email: followUserEmail,
    }).then(async (user) => {
      // 찾은 유저 결과가 없으면 400 error code와 함께 오류 메시지 데이터 응답.
      if (!user)
        return res
          .status(400)
          .json({ msg: "팔로우할 유저가 존재하지 않습니다." });

      console.log("findUser is ", user);

      // 이미 팔로우 하고 있는 사용자인지 확인하기 위해 MongoDB follows collection 체크.
      const findResult = await Follow.findOne({
        user: req.user.id,
        follow: user.id,
      });
      // 있으면 이미 팔로우 하고 있는 유저이므로 오류코드 리턴.
      if (findResult) return res.status(400).json({ success: false });

      // Follows collection에 document 생성 (팔로잉 정보 추가)
      await Follow.create({
        user: req.user.id,
        follow: user.id,
        date: moment().format("YYYY-MM-DD HH:mm:ss"),
      });

      // 결과 데이터 응답.
      return res.status(200).json({ ...user._doc, isFollowing: true });
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({ msg: e.message });
  }
});

// @routes    POST api/follow/removeFollow
// @desc      Remove follow
// @access    private
router.post("/removeFollow", auth, async (req, res) => {
  try {
    // 팔로우 취소할 사용자 아이디를 Request Body에서 읽어온다.
    const { unfollowUserEmail } = req.body;

    // 팔로우 취소할 사용자 정보를 MongoDB Users collection에서 찾는다.
    await User.findOne({
      email: unfollowUserEmail,
    }).then(async (user) => {
      // MongoDB에서 사용자 정보를 찾지 못했을 경우 400error와 함께 오류 메시지를 응답한다.
      if (!user)
        return res
          .status(400)
          .json({ msg: "팔로우 취소할 유저가 존재하지 않습니다." });

      // MongoDB follows collection에서 팔로우 취소할 사용자 id와 요청한 사용자 id로 조건을 걸어,
      // Document를 삭제한다.
      const findResult = await Follow.deleteOne({
        user: req.user.id,
        follow: user.id,
      });

      // 200 success code와 함께, 팔로잉 취소한 사용자 정보 안에 isFollowing 값을 false로 담아 응답한다.
      return res.status(200).json({ ...user._doc, isFollowing: false });
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({ msg: e.message });
  }
});

export default router;
