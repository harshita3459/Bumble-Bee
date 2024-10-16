import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './feedback.css';

const PaymentSuccess = () => {
    const navigate = useNavigate();
    const [feedback, setFeedback] = useState({
        name: '',
        experience: '',
        message: '',
        suggestion: '',

    });

    const handleFeedbackChange = (e) => {
        setFeedback({ ...feedback, [e.target.name]: e.target.value });
    };

    const handleFeedbackSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/submit-feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(feedback),
            });

            const data = await response.json();
            if (data.status === 'success') {
                alert('Thank you for your feedback!');
                navigate('/restaurants'); // Redirect to restaurant page after successful feedback submission
            } else {
                alert('Failed to submit feedback, please try again.');
            }
        } catch (error) {
            console.error('Feedback Error:', error);
            alert('Something went wrong, please try again later.');
        }
    };

    return (
        <div className="payment-success-container">
            <h2>Thank You for Visiting Us</h2>
            <p>Payment was successful!</p>

            <button onClick={() => document.getElementById('feedback-form').style.display = 'block'}>
                Give Feedback
            </button>

            <form id="feedback-form" style={{ display: 'none' }} onSubmit={handleFeedbackSubmit}>
                <div className="form-group">
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={feedback.name}
                        onChange={handleFeedbackChange}
                        placeholder="Your name"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Experience:</label>
                    <input
                        type="text"
                        name="experience"
                        value={feedback.experience}
                        onChange={handleFeedbackChange}
                        placeholder="Your experience"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Message:</label>
                    <input
                        type="text"
                        name="message"
                        value={feedback.message}
                        onChange={handleFeedbackChange}
                        placeholder="Your message"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Suggestion:</label>
                    <input
                        type="text"
                        name="suggestion"
                        value={feedback.suggestion}
                        onChange={handleFeedbackChange}
                        placeholder="Your suggestions"
                        required
                    />
                </div>

                <button type="submit">Submit Feedback</button>
            </form>
        </div>
    );
};

export default PaymentSuccess;