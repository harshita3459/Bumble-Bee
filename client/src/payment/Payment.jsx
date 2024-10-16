import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EKQRPayment = () => {
    const [upiId, setUpiId] = useState('');
    const [amount, setAmount] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
    const [customerMobile, setCustomerMobile] = useState('');
    const [orderStatus, setOrderStatus] = useState(null);

    const navigate = useNavigate(); // Use navigate for redirection

    const handlePayment = async (e) => {
        e.preventDefault();

        const paymentData = {
            client_txn_id: Math.floor(Math.random() * 1000000000).toString(),
            amount,
            p_info: "Product Name",
            customer_name: customerName,
            customer_email: customerEmail,
            customer_mobile: customerMobile,
            redirect_url: "http://your-restaurant-page-url.com",
        };

        try {
            // Call backend to initiate payment via EKQR API
            const response = await fetch('http://localhost:5000/api/create-ekqr-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(paymentData),
            });

            const data = await response.json();

            if (data.status === 'success') {
                setOrderStatus('Payment initiated successfully! Please follow the instructions.');
            } else {
                setOrderStatus('Payment initiation failed, but you can still provide feedback.');
            }

            // Always redirect to the Feedback page after clicking the submit button
            setTimeout(() => {
                navigate('/feedback');
            }, 1000); // Delay redirection by 1 second for better UX

        } catch (error) {
            console.error('Payment Error:', error);
            setOrderStatus('Something went wrong, please try again later.');
            setTimeout(() => {
                navigate('/feedback');
            }, 1000); // Redirect even if there's an error
        }
    };

    return (
        <div className="ekqr-payment-container">
            <h2>EKQR UPI Payment</h2>
            <form onSubmit={handlePayment}>
                <div className="form-group">
                    <label>UPI ID:</label>
                    <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="Enter your UPI ID"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Amount (₹):</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Enter amount"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Customer Name:</label>
                    <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Enter your name"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Customer Email:</label>
                    <input
                        type="email"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Customer Mobile:</label>
                    <input
                        type="tel"
                        value={customerMobile}
                        onChange={(e) => setCustomerMobile(e.target.value)}
                        placeholder="Enter your mobile number"
                        required
                    />
                </div>
                <button type="submit" className="pay-button">
                    Proceed to Pay
                </button>
            </form>

            {orderStatus && <p>{orderStatus}</p>}
        </div>
    );
};

export default EKQRPayment;