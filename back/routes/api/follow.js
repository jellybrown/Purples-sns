import express from "express";
import Follow from "../../models/follow";
import auth from "../../middleware/auth";
import User from "../../models/user";
import moment from "moment";

const router = express.Router();

// @routes    GET api/follow/getFollowingList
// @desc      Get following list
// @access    private
router.get("/getFollowingList", auth, async (req, res) => {
  try {
    const following = await Follow.find({
      user: req.user.id,
    });
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
    const follower = await Follow.find({
      follow: req.user.id,
    });
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
    const { followUserEmail } = req.body;

    await User.findOne({
      email: followUserEmail,
    }).then(async (user) => {
      if (!user)
        return res
          .status(400)
          .json({ msg: "팔로우할 유저가 존재하지 않습니다." });

      const findResult = await Follow.findOne({
        user: req.user.id,
        follow: user.id,
      });
      if (findResult) return res.status(400).json({ success: false });

      await Follow.create({
        user: req.user.id,
        follow: user.id,
        date: moment().format("YYYY-MM-DD hh:mm:ss"),
      });

      return res.status(200).json({ success: true });
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({ msg: e.message });
  }
});

export default router;
