const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductsSchema = mongoose.Schema({
  price: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  address: { type: String },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Users",
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Category",
  },
  media: {
    type: [{ link: String, type: 0 }],
  },
  trending: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Products", ProductsSchema, "products");
