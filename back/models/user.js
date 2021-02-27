import mongoose from "mongoose";
import moment from "moment";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  profileImageUrl: {
    type: String,
    default: "https://source.unsplash.com/random/200x200",
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["Admin", "User"],
    default: "User",
  },
  register_date: {
    type: Date,
    default: moment().format("YYYY-MM-DD HH:mm:ss"),
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "posts",
    },
  ],
  comments: [
    {
      post_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "posts",
      },
      comment_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "comments",
      },
    },
  ],
});

const User = mongoose.model("user", UserSchema);

export default User;
