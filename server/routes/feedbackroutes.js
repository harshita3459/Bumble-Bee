const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

// Feedback Schema
const feedbackSchema = new mongoose.Schema({
    name: String,


    experience: String,
    message: String,
    suggestion: String,

    date: { type: Date, default: Date.now }
});

const Feedback = mongoose.model('Feedback', feedbackSchema);
exports.getFeedback = async (req, res) => {
    try {
        const feedback = await Feedback.find(); // Fetch all feedback from MongoDB
        res.status(200).json(feedback);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch feedback' });
    }
};

// POST endpoint to submit feedback
router.post('/submit-feedback', async (req, res) => {
    const { experience, message, suggestion, name } = req.body;

    try {
        const feedback = new Feedback({
            name,
            experience,
            message,
            suggestion

        });

        await feedback.save();
        res.status(200).json({ status: 'success', message: 'Feedback submitted successfully' });
    } catch (error) {
        console.error('Feedback Save Error:', error);
        res.status(500).json({ status: 'error', message: 'Failed to submit feedback' });
    }
});
router.get('/feedback', async (req, res) => {
    try {
        const feedbacks = await Feedback.find(); // Fetch all feedback from the database
        res.status(200).json({ status: 'success', data: feedbacks });
    } catch (error) {
        console.error('Feedback Fetch Error:', error);
        res.status(500).json({ status: 'error', message: 'Failed to fetch feedback' });
    }
});
module.exports = router;