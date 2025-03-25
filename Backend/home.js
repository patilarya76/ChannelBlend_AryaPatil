const mongoose = require("mongoose");

const homeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  barcode: {
    type: String,
    unique: true,
    sparse: true,
  },
});

module.exports = mongoose.model("Home", homeSchema); 