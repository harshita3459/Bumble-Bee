



const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const multer = require('multer');
const path = require('path');

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Ensure 'uploads/' directory exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Save the file with a timestamp
  },
});

const upload = multer({ storage: storage });

// POST route to add a new restaurant
router.post('/add/restaurants', upload.single('imageUpload'), adminController.addNewRestaurant);

router.get('/restaurants', adminController.getAllRestaurants);


module.exports = router;
