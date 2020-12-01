const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentsSchema = mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Users",
  },
  postId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Posts",
  },
  idCommentParrent: {
    type: String,
    // required: true,
  },
  like: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Comments", CommentsSchema);
