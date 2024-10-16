import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import SweetAlert
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Function to handle logout with SweetAlert confirmation
  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out of your session!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, log me out!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('token'); // Remove token or any other session data
        navigate('/login'); // Redirect to the login page after logging out
        Swal.fire('Logged Out', 'You have been successfully logged out!', 'success');
      }
    });
  };

  return (
    <nav className={`navbar ${isMenuOpen ? 'navbar-responsive' : ''}`}>
      <div className="navbar-logo">
        <img src="/logo-removebg-preview.png" alt="Logo" className="large-logo" />
      </div>
      <ul className="navbar-links">
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">Sign Up</Link></li>
        <li><Link to="/about-us">About Us</Link></li>
        <li><Link to="/contact-us">Contact Us</Link></li>
        {/* Add onClick event for logout */}
        <li>
          <span className="logout-link" onClick={handleLogout} style={{ cursor: 'pointer' }}>Logout</span>
        </li>
      </ul>
      <div className="hamburger-menu" onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </nav>
  );
};

export default Navbar;
