import React from 'react';
import './Cart.css';

const Cart = ({ cart }) => {
  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cart.map((item, index) => (
          <div key={index} className="cart-item">
            <img src={item.imageUrl} alt={item.name} className="cart-image" />
            <div className="cart-info">
              <h3>{item.name}</h3>
              <p>{item.address}</p>
              <p>{item.cuisine}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Cart;
