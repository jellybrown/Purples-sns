import mongoose from "mongoose";
import moment from "moment";

// MongoDB 게시글 스키마
const PostSchema = new mongoose.Schema({
  contents: {
    type: String,
    required: true,
  },
  imageUrls: [
    {
      type: String,
      default: "https://source.unsplash.com/random/500x500",
    },
  ],
  date: {
    type: String,
    default: moment().format("YYYY-MM-DD HH:mm:ss"),
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "comment",
    },
  ],
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  writer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

// post의 복수형인 posts collection에 접근
const Post = mongoose.model("post", PostSchema);

export default Post;
