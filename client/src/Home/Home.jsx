import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';
import './Home.css';

const testimonialsData = [
  {
    text: `"Dapibus ultrices in iaculis nunc sed augue lacus viverra vitae. Mauris a diam maecenas sed enim. Egestas diam in arcu cursus euismod quis. Quam quisque id diam vel."`,
    customerName: "Thomas Adamson",
    customerRating: "⭐⭐⭐⭐⭐",
    imageUrl: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    text: `"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nec lacus ut diam suscipit ultrices a id ligula."`,
    customerName: "Jane Smith",
    customerRating: "⭐⭐⭐⭐",
    imageUrl: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    text: `"Aliquam erat volutpat. Nulla facilisi. Donec in arcu at libero aliquam tincidunt nec vitae orci."`,
    customerName: "Mark Johnson",
    customerRating: "⭐⭐⭐⭐⭐",
    imageUrl: "https://randomuser.me/api/portraits/men/10.jpg",
  },
];

const Home = () => {
  const [cuisine, setCuisine] = useState('Italian');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      (error) => console.error('Error fetching location:', error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }, []);

  // Automatic sliding every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleNextClick(); // Move to the next testimonial automatically
    }, 5000);

    return () => clearInterval(interval); // Clean up on component unmount
  }, [currentTestimonial]);

  // Handle the Next Button
  const handleNextClick = () => {
    setCurrentTestimonial((prevIndex) => (prevIndex + 1) % testimonialsData.length);
  };

  // Handle the Previous Button
  const handlePrevClick = () => {
    setCurrentTestimonial((prevIndex) =>
      prevIndex === 0 ? testimonialsData.length - 1 : prevIndex - 1
    );
  };

  const handleOrderNow = () => {
    navigate('/login');
  };

  return (
    <div>
      <div className="home-container">
        <div className="left-content">
          <h1>The Best Restaurants <br /> In Your Home</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
          <button className="order-now-button" onClick={handleOrderNow}>ORDER NOW</button>
        </div>

        <div className="right-content">
          <img src="/photo-1.png" className='image-slide-up' alt="Restaurant" />
          <div className="restaurant-info">
            <span>12 Restaurants In Your City</span>
          </div>
          <div className="restaurant-card">
            <p>Restaurant of the Month</p>
            <h4>The Wilmington</h4>
            <span>⭐⭐⭐⭐⭐</span>
          </div>
        </div>
      </div>

      <div className="how-it-works-section">
        <h2>How It Works</h2>
        <p>Magna sit amet purus gravida quis blandit turpis cursus. Venenatis tellus in metus vulputate eu scelerisque felis.</p>

        <div className="how-it-works-steps">
          <div className="step">
            <img src="/Illustration-1.png" className='how-it-works-iamge' alt="Select Restaurant" />
            <h3>01 Select Restaurant</h3>
            <p>Non enim praesent elementum facilisis leo vel fringilla. Lectus proin nibh nisl condimentum id.</p>
          </div>

          <div className="step">
            <img src="/Illustration-2.png" className='how-it-works-iamge' alt="Select Menu" />
            <h3>02 Select Menu</h3>
            <p>Eu mi bibendum neque egestas congue quisque. Nulla facilisi morbi tempus iaculis urna id.</p>
          </div>

          <div className="step">
            <img src="/illustration-3.png" className='how-it-works-iamge' alt="Wait for Delivery" />
            <h3>03 Wait for Delivery</h3>
            <p>Nunc lobortis mattis aliquam faucibus. Nibh ipsum consequat nisl vel pretium lectus quam id leo.</p>
          </div>
        </div>
      </div>

      <div className="promo-section">
        <div className="promo-left">
          <img src="/photo-3.png" className='promo-image-slide-left' alt="Excited Woman" />
        </div>
        <div className="promo-right">
          <h1>Food from your favorite restaurants to your table</h1>
          <p>
            Pretium lectus quam id leo in vitae turpis massa sed. Lorem donec
            massa sapien faucibus et molestie. Vitae elementum curabitur vitae nunc.
          </p>
          <ul className="promo-list">
            <li><i className="fas fa-hamburger"></i> Burgers</li>
            <li><i className="fas fa-drumstick-bite"></i> Steaks</li>
            <li><i className="fas fa-pizza-slice"></i> Pizza</li>
          </ul>
        </div>
      </div>

      <div className="customer-stats">
        <div className="achievements-container">
          <h1>Achievement</h1>
          <div className="stats-container">
            <div className="stat">
              <h2>976</h2>
              <p>Satisfied Customers</p>
            </div>
            <div className="stat">
              <h2>12</h2>
              <p>Best Restaurants</p>
            </div>
            <div className="stat">
              <h2>1K+</h2>
              <p>Food Delivered</p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section with Slider and Controls */}
      <div className="testimonials-section-wrapper">
        <div className="testimonials-section">
          <h2>What customers say about us</h2>
          <div className="testimonials-container">
            <div className="testimonial">
              <button className="prev-button" onClick={handlePrevClick}>←</button>

              <div className="testimonial-content">
                <div className="testimonial-text">
                  <p>{testimonialsData[currentTestimonial].text}</p>
                  <div className="customer-info">
                    <img src={testimonialsData[currentTestimonial].imageUrl} alt="Customer" />
                    <div>
                      <p className="customer-name">{testimonialsData[currentTestimonial].customerName}</p>
                      <p className="customer-rating">{testimonialsData[currentTestimonial].customerRating}</p>
                    </div>
                  </div>
                </div>
              </div>

              <button className="next-button" onClick={handleNextClick}>→</button>
            </div>
            <img src="/photo-4.png" alt="Quote" className="quote-image" />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
