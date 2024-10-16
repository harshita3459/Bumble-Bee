// server/controllers/adminController.js

const Dish = require('../models/Dish');

// Add new dish
const addNewDish = async (req, res) => {
  try {
    const { dishName, dishPrice, restaurantId } = req.body;
    const image = `/uploads/${req.file.filename}`; // Use only the uploaded image

    if (!dishName || !dishPrice || !image || !restaurantId) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newDish = new Dish({ dishName, dishPrice, dishImage: image, restaurant: restaurantId });
    await newDish.save();
    return res.status(201).json({ message: 'Dish added successfully', dish: newDish });
  } catch (error) {
    console.error('Error while adding dish:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Fetch all dishes (optional)
const getAllDishes = async (req, res) => {
  try {
    const dishes = await Dish.find().populate('restaurant'); // Populate restaurant info if needed
    res.status(200).json(dishes);
  } catch (error) {
    console.error('Error fetching dishes', error);
    res.status(500).json({ message: 'Error fetching dishes' });
  }
};

module.exports = {
  // ... other exports,
  addNewDish,
  getAllDishes
};
