const mongoose = require("mongoose");

const accessorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  barcode: { type: String, sparse: true }
});

const Accessory = mongoose.model("accessories", accessorySchema);

module.exports = Accessory; 