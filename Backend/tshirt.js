const mongoose = require("mongoose");

const tshirtSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  barcode: { type: String, sparse: true }
});

const Tshirt = mongoose.model("tshirts", tshirtSchema);

module.exports = Tshirt; 