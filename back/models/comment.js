import mongoose from "mongoose";
import moment from "moment";

// MongoDB 댓글 스키마
const CommentSchema = new mongoose.Schema({
  contents: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    default: moment().format("YYYY-MM-DD HH:mm:ss"),
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "post",
  },
  writer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  writerName: {
    type: String,
  },
});

// comment의 복수형인 comments collection에 접근
const Comment = mongoose.model("comment", CommentSchema);

export default Comment;
