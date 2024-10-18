import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import './RestaurantList.css';

Modal.setAppElement('#root');

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const navigate = useNavigate();

  // Authentication check
  useEffect(() => {
    const token = localStorage.getItem('token'); // Or wherever you store your token

    if (!token) {
      // If no token, redirect to login
      navigate('/login');
    } else {
      // Optionally, you can verify the token here or fetch user data
      fetchRestaurants();
    }
  }, [navigate]);

  // Fetch restaurants from backend
  const fetchRestaurants = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/restaurants', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Send token for authentication
        },
      });
      const data = await response.json();
      setRestaurants(data);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    }
  };

  // Filter restaurants based on location
  const filteredRestaurants = selectedLocation
    ? restaurants.filter(restaurant => restaurant.address.toLowerCase().includes(selectedLocation.toLowerCase()))
    : restaurants;

  const openModal = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setRating(0);
    setReview('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetch(`http://localhost:5000/api/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include token for the review submission
        },
        body: JSON.stringify({
          restaurantId: selectedRestaurant._id,
          rating,
          review,
        }),
      });

      closeModal();
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
  };

  const handleRestaurantClick = (restaurantId) => {
    navigate(`/dishes/${restaurantId}`); // Navigate to the dishes page, passing restaurantId
  };

  return (
    <div className="restaurant-container">
      <div className="location-select-container">
        <select
          value={selectedLocation}
          onChange={handleLocationChange}
          className="location-select"
        >
          <option value="" disabled>Select Location</option>
          <option value="mathura">Mathura</option>
          <option value="agra">Agra</option>
          <option value="delhi">Delhi</option>
          <option value="punjab">Punjab</option>
        </select>
      </div>

      <div className="restaurant-list">
        {filteredRestaurants.length === 0 ? (
          <p>No restaurants available</p>
        ) : (
          filteredRestaurants.map((restaurant) => (
            <div
              key={restaurant._id}
              className="restaurant-item"
              onClick={() => handleRestaurantClick(restaurant._id)}
            >
              <div className="restaurant-image">
                <img
                  src={`http://localhost:5000${restaurant.image}`}
                  alt={restaurant.name}
                />
              </div>
              <div className="restaurant-info">
                <h3>{restaurant.name}</h3>
                <p><strong>Cuisine:</strong> {restaurant.cuisine}</p>
                <p><strong>Address:</strong> {restaurant.address}</p>
                <div className="rating-stars">
                  <strong>Rating:</strong>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      onClick={() => {
                        setRating(star);
                        setReview(`Rated ${star} stars`);
                      }}
                      style={{ cursor: 'pointer', color: star <= rating ? 'gold' : 'gray' }}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Rate Restaurant">
        <h2>Rate {selectedRestaurant?.name}</h2>
        <form onSubmit={handleSubmit}>
          <div className="rating-stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => {
                  setRating(star);
                  setReview(`Rated ${star} stars`);
                }}
                style={{ cursor: 'pointer', color: star <= rating ? 'gold' : 'gray' }}
              >
                ★
              </span>
            ))}
          </div>
          <textarea
            placeholder="Write your review here..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
          />
          <button type="submit">Submit</button>
          <button type="button" onClick={closeModal}>Cancel</button>
        </form>
      </Modal>
    </div>
  );
};

export default RestaurantList;
