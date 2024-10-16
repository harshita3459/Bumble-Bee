// server/models/restaurant.js

const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  cuisine: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
