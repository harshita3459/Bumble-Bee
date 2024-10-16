// server/models/dish.js

const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({
  dishName: { type: String, required: true },
  dishPrice: { type: Number, required: true },
  dishImage: { type: String, required: true }, // URL to the uploaded image
  
});

module.exports = mongoose.model('Dish', dishSchema);
