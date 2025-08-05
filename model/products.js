const { Schema, model } = require("mongoose");

const ProductSchema = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  images: {
    type: Array,
    required: true,
  },
  price: {
    type: Number,
  },
});

module.exports = model("Product", ProductSchema);
