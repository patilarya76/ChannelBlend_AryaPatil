require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./db");
const Shoe = require("./shoe.js");
const Tshirt = require("./tshirt");
const Accessory = require("./accessory");

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
    const shoe = await Shoe.findOne({ barcode: req.params.code });
    if (!shoe) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(shoe);
  } catch (error) {
    console.error("Error finding product:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

app.post("/api/shoes", async (req, res) => {
  try {
    const shoe = new Shoe(req.body);
    await shoe.save();
    res.status(201).json(shoe);
  } catch (error) {
    console.error("Error creating shoe:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// T-shirt routes
app.get("/api/tshirts", async (req, res) => {
  try {
    const tshirts = await Tshirt.find();
    res.status(200).json(tshirts);
  } catch (error) {
    console.error("Error fetching t-shirts:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

app.get("/api/tshirts/barcode/:code", async (req, res) => {
  try {
    const tshirt = await Tshirt.findOne({ barcode: req.params.code });
    if (!tshirt) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(tshirt);
  } catch (error) {
    console.error("Error finding product:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

app.post("/api/tshirts", async (req, res) => {
  try {
    const tshirt = new Tshirt(req.body);
    await tshirt.save();
    res.status(201).json(tshirt);
  } catch (error) {
    console.error("Error creating t-shirt:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// Accessories routes
app.get("/api/accessories", async (req, res) => {
  try {
    const accessories = await Accessory.find();
    res.status(200).json(accessories);
  } catch (error) {
    console.error("Error fetching accessories:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

app.get("/api/accessories/barcode/:code", async (req, res) => {
  try {
    const accessory = await Accessory.findOne({ barcode: req.params.code });
    if (!accessory) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(accessory);
  } catch (error) {
    console.error("Error finding product:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

app.post("/api/accessories", async (req, res) => {
  try {
    const accessory = new Accessory(req.body);
    await accessory.save();
    res.status(201).json(accessory);
  } catch (error) {
    console.error("Error creating accessory:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));