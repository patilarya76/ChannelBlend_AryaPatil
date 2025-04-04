const mongoose = require("mongoose");

const shoeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  barcode: { type: String, unique: true }
});

const Shoe = mongoose.model("shoes", shoeSchema);

module.exports = Shoe;
