const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  idParent: {
    type: String,
    // required: true,
    // ref: "Posts",
  },
  icon: {
    type: String,
    // required: true,
  },
});

module.exports = mongoose.model("Category", CategorySchema, "category");
