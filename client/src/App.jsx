import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Login/Login';
import Register from './Register/Register';
import Home from './Home/Home';
import Navbar from './components/Navbar';
import AdminDashboard from './Dashboard/AdminDashboard';
import RestaurantList from './RestaurantList/RestaurantList';
import About from './About/About';
import DishList from './dish/DishList';
import ContactUs from './ContactUs/ContactUs';
import Cart from './Cart/Cart';
import Order from './order/order';
import Payment from './payment/payment';
import Feedback from './feedback/feedback';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/restaurants" element={<RestaurantList />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/dishes" element={<DishList />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order-form" element={<Order />} />
        <Route path="/payment-gateway" element={<Payment />} />
        <Route path="/feedback" element={<Feedback />} />
      </Routes>
    </>
  );
}

export default App;