import express from "express";
import User from "../../models/user";
import auth from "../../middleware/auth";
import Follow from "../../models/follow";

const router = express();

/*
  @route    GET  api/search
  @desc     사용자 리스트 검색 (팔로잉/언팔로잉)
  @access   Private
 */
router.get("/", auth, async (req, res, next) => {
  try {
    // 요청자가 팔로잉하고 있는 정보 검색.
    const following = await Follow.find({ user: req.user.id });

    // 요청자를 제외한 전체 사용자 검색.
    const result = await User.find({ _id: { $ne: req.user.id } })
      .populate({ path: "users" })
      .lean();

    // 요청자가 팔로잉하고 있는 사용자일 경우 isFollowing 값에 true 설정.
    for (let i = 0; i < result.length; i++) {
      result[i].isFollowing = false;
      for (let j = 0; j < following.length; j++) {
        if (result[i]._id.equals(following[j].follow)) {
          result[i].isFollowing = true;
        }
      }
    }

    // 결과 정보 응답
    res.send(result);
  } catch (e) {
    console.log(e);
    next(e);
  }
});

/*
  @route    GET  api/search/:searchTerm
  @desc     사용자 리스트 검색 (검색조건 적용)
  @access   Private
 */
router.get("/:searchTerm", auth, async (req, res, next) => {
  // 검색조건 확인용 로그
  try {
    // 요청자가 팔로잉하고 있는 정보 검색.
    const following = await Follow.find({ user: req.user.id });

    // 요청자를 제외한 전체 사용자 검색. (검색조건으로 넘어온 값에 일치하는 사용자만 검색)
    const result = await User.find({
      _id: { $ne: req.user.id },
      name: {
        $regex: req.params.searchTerm,
        $options: "i",
      },
    })
      .populate({ path: "users" })
      .lean();

    // 요청자가 팔로잉하고 있는 사용자일 경우 isFollowing 값에 true 설정.
    for (let i = 0; i < result.length; i++) {
      result[i].isFollowing = false;
      for (let j = 0; j < following.length; j++) {
        if (result[i]._id.equals(following[j].follow)) {
          result[i].isFollowing = true;
        }
      }
    }
    // 결과 정보 응답
    res.send(result);
  } catch (e) {
    console.log(e);
    next(e);
  }
});

export default router;
