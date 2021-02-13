import express from "express";
import User from "../../models/user";
import auth from "../../middleware/auth";
import Follow from "../../models/follow";

const router = express();

router.get("/", auth, async (req, res, next) => {
  try {
    const following = await Follow.find({ user: req.user.id });
    console.log("searchTerm following: ", following);

    const result = await User.find({ _id: { $ne: req.user.id } })
      .populate({ path: "users" })
      .lean();

    for (let i = 0; i < result.length; i++) {
      result[i].isFollowing = false;
      for (let j = 0; j < following.length; j++) {
        if (result[i]._id.equals(following[j].follow)) {
          result[i].isFollowing = true;
        }
      }
    }
    console.log(result, "Search result");

    res.send(result);
  } catch (e) {
    console.log(e);
    next(e);
  }
});

router.get("/:searchTearm", auth, async (req, res, next) => {
  console.log(req.params.searchTearm);
  try {
    const following = await Follow.find({ user: req.user.id });
    console.log("searchTerm following: ", following);

    const result = await User.find({
      _id: { $ne: req.user.id },
      name: {
        $regex: req.params.searchTearm,
        $options: "i",
      },
    })
      .populate({ path: "users" })
      .lean();

    for (let i = 0; i < result.length; i++) {
      result[i].isFollowing = false;
      for (let j = 0; j < following.length; j++) {
        if (result[i]._id.equals(following[j].follow)) {
          result[i].isFollowing = true;
        }
      }
    }
    console.log(result, "Search result");

    res.send(result);
  } catch (e) {
    console.log(e);
    next(e);
  }
});

export default router;
