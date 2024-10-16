import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Order.css';

const OrderPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { dish } = location.state; // Get the dish details passed via navigate
  const [paymentMethod, setPaymentMethod] = useState('');

  const handlePaymentSelection = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (paymentMethod === 'UPI') {
      // Redirect to payment gateway if UPI is selected
      navigate('/payment-gateway', { state: { dish, paymentMethod } });
    } else {
      alert('Order placed successfully! Cash on Delivery selected.');
      // Logic to handle Cash on Delivery order
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="content-wrapper">
        <img src='/Group.png' alt='Group' className='group-img' />
        <div className="order-form-container">
          <h2>Order {dish.name}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name:</label>
              <input type="text" required />
            </div>
            <div className="form-group">
              <label>Address:</label>
              <textarea required></textarea>
            </div>
            <div className="form-group">
              <label>Contact Number:</label>
              <input type="tel" required />
            </div>
            <div className="form-group">
              <label>Price: ₹{dish.price}</label>
            </div>
            <div className="form-group">
              <label>Payment Method:</label>
              <select value={paymentMethod} onChange={handlePaymentSelection} required>
                <option value="">Select Payment Method</option>
                <option value="UPI">UPI</option>
                <option value="COD">Cash on Delivery</option>
              </select>
            </div>
            <button type="submit">Place Order</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;