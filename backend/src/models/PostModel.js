const mongoose = require("mongoose");

const PostSchame = new mongoose.Schema(
  {
    author: String,
    place: String,
    description: String,
    hashtags: String,
    image: String,
    likes: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);
const Post = mongoose.model("post", PostSchame);

module.exports = Post
