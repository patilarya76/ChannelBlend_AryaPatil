require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./db");
const Shoe = require("./shoe.js");
const Tshirt = require("./tshirt");
const Accessory = require("./accessory");
const Eco = require("./eco");
const Travel = require("./travel");
const Home = require("./home");

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

// New routes for eco-friendly products
app.get("/api/eco", async (req, res) => {
  try {
    const ecoProducts = await Eco.find();
    res.status(200).json(ecoProducts);
  } catch (error) {
    console.error("Error fetching eco products:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

app.post("/api/eco", async (req, res) => {
  try {
    const newEcoProduct = new Eco(req.body);
    const savedProduct = await newEcoProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error("Error creating eco product:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// Routes for travel essentials
app.get("/api/travel", async (req, res) => {
  try {
    const travelItems = await Travel.find();
    res.status(200).json(travelItems);
  } catch (error) {
    console.error("Error fetching travel items:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

app.post("/api/travel", async (req, res) => {
  try {
    const newTravelItem = new Travel(req.body);
    const savedItem = await newTravelItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    console.error("Error creating travel item:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// Routes for home & lifestyle products
app.get("/api/home", async (req, res) => {
  try {
    const homeProducts = await Home.find();
    res.status(200).json(homeProducts);
  } catch (error) {
    console.error("Error fetching home products:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

app.post("/api/home", async (req, res) => {
  try {
    const newProduct = new Home(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error("Error creating home product:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// Barcode lookup route for all products
app.get("/api/product/barcode/:barcode", async (req, res) => {
  const { barcode } = req.params;
  try {
    // Search in all collections
    const product = await Promise.any([
      Shoe.findOne({ barcode }),
      Tshirt.findOne({ barcode }),
      Accessory.findOne({ barcode }),
      Eco.findOne({ barcode }),
      Travel.findOne({ barcode }),
      Home.findOne({ barcode })
    ]);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.error("Error finding product by barcode:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// Test data endpoint
app.post("/api/test-data", async (req, res) => {
  try {
    // Sample data for new categories
    const ecoProducts = [
      {
        name: "Bamboo Water Bottle",
        price: 24.99,
        description: "Eco-friendly bamboo water bottle",
        image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8",
        barcode: "eco123"
      },
      {
        name: "Reusable Shopping Bag",
        price: 12.99,
        description: "Durable eco-friendly shopping bag",
        image: "https://images.unsplash.com/photo-1597484661643-2f5fef640dd1",
        barcode: "eco124"
      }
    ];

    const travelItems = [
      {
        name: "Travel Organizer",
        price: 34.99,
        description: "Compact travel organizer for essentials",
        image: "https://images.unsplash.com/photo-1553531384-397c80973a0b",
        barcode: "travel123"
      },
      {
        name: "Neck Pillow",
        price: 19.99,
        description: "Memory foam travel neck pillow",
        image: "https://images.unsplash.com/photo-1520473378652-85d9c4aee6cf",
        barcode: "travel124"
      }
    ];

    const homeProducts = [
      {
        name: "Scented Candle",
        price: 29.99,
        description: "Handmade aromatherapy candle",
        image: "https://images.unsplash.com/photo-1602523961358-f9f03dd557db",
        barcode: "home123"
      },
      {
        name: "Throw Blanket",
        price: 49.99,
        description: "Soft decorative throw blanket",
        image: "https://images.unsplash.com/photo-1580376259349-5f4b7db4c39f",
        barcode: "home124"
      }
    ];

    // Insert test data
    await Eco.insertMany(ecoProducts);
    await Travel.insertMany(travelItems);
    await Home.insertMany(homeProducts);

    res.status(201).json({ message: "Test data added successfully" });
  } catch (error) {
    console.error("Error adding test data:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));