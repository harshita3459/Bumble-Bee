const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const fs = require('fs');
const path = require('path'); // Import path here

const authRoutes = require('./routes/authroutes'); // Assuming you have auth routes
const adminRoutes = require('./routes/adminroutes');
const dishRoutes = require('./routes/dishroutes');
const feedbackRoutes = require('./routes/feedbackroutes');
const paymentRoute = require('./routes/paymentroutes');// Make sure this matches your file name

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the uploads folder
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir); // Create uploads folder if it doesn't exist
}
app.use('/uploads', express.static(uploadDir)); // Serve uploaded images

// Use routes
app.use('/api/auth', authRoutes); // Assuming you have auth routes
app.use('/api/admin', adminRoutes); // Admin routes
app.use('/api/dish', dishRoutes);
app.use('/api', feedbackRoutes);
app.use('', paymentRoute); // Ensure this line is correctly pointing to your dish routes

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});