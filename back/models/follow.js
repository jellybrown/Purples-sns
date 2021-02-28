import mongoose from "mongoose";
import moment from "moment";

// MongoDB 팔로우 스키마
const FollowSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  follow: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  date: {
    type: String,
    default: moment().format("YYYY-MM-DD HH:mm:ss"),
  },
});

// follow의 복수형인 follows collection에 접근
const Follow = mongoose.model("follow", FollowSchema);

export default Follow;
