require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./db");
const Shoe = require("./shoe.js");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

app.get("/api/shoes", async (req, res) => {
    try {
      const shoes = await Shoe.find();
      res.status(200).json(shoes);
    } catch (error) {
      console.error("Error fetching shoes:", error);
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  });

  app.get("/api/shoes/barcode/:code", async (req, res) => {
    try {
      const shoe = await Shoe.findOne({ barcode: req.params.code }); // Search by barcode
      if (!shoe) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(200).json(shoe);
    } catch (error) {
      console.error("Error finding product:", error);
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));