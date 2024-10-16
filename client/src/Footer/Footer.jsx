import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Contact Info */}
        <div className="footer-column">
          <h3>Contact Us</h3>
          <p>Email: info@tastytrack.com</p>
          <p>Phone: +123 456 789</p>
          <p>Address: 123 Food Street, Taste City</p>
        </div>

        {/* Quick Links */}
        <div className="footer-column">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#about">About Us</a></li>
            <li><a href="#restaurants">Our Restaurants</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="footer-column">
          <h3>Follow Us</h3>
          <ul className="social-icons">
            <li><a href="https://facebook.com"><i className="fab fa-facebook"></i></a></li>
            <li><a href="https://twitter.com"><i className="fab fa-twitter"></i></a></li>
            <li><a href="https://instagram.com"><i className="fab fa-instagram"></i></a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 TastyTrack. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
