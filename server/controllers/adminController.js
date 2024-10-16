const multer = require('multer');
const Restaurant = require('../models/restaurant');
const path = require('path');

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Save uploaded images to the "uploads" folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Rename the file with the current timestamp
  }
});

const upload = multer({ storage: storage });

// Get all restaurants
const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.status(200).json(restaurants);
  } catch (error) {
    console.error('Error fetching restaurants', error);
    res.status(500).json({ message: 'Error fetching restaurants' });
  }
};

// Add new restaurant
const addNewRestaurant = async (req, res) => {
  try {
    const { name, address, cuisine, price } = req.body;
    const image = `/uploads/${req.file.filename}`; // Use only the uploaded image

    if (!name || !address || !cuisine || !price || !image) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newRestaurant = new Restaurant({ name, address, cuisine, price, image });
    await newRestaurant.save();
    return res.status(201).json({ message: 'Restaurant added successfully', restaurant: newRestaurant });
  } catch (error) {
    console.error('Error while adding restaurant:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getAllRestaurants,
  addNewRestaurant,
  upload // Export multer upload for route use
};
