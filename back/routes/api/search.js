import express from "express";
import User from "../../models/user";

const router = express();

router.get("/:searchTearm", async (req, res, next) => {
  console.log(req.params.searchTearm);
  try {
    const result = await User.find({
      name: {
        $regex: req.params.searchTearm,
        $options: "i",
      },
    }).populate({ path: "users" });
    console.log(result, "Search result");
    res.send(result);
  } catch (e) {
    console.log(e);
    next(e);
  }
});

export default router;
