import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

// Register the required components
Chart.register(ArcElement, Tooltip, Legend);

const AdminDashboard = () => {
  // State variables for admin authentication, restaurants, and feedback
  const [formData, setFormData] = useState({ name: '', address: '', cuisine: '', price: '' });
  const [imageFile, setImageFile] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminCredentials, setAdminCredentials] = useState({ username: '', password: '' });
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchStats, setSearchStats] = useState({ mostSearched: [], leastSearched: [] });
  const [loading, setLoading] = useState(false); // For loading restaurants
  const [error, setError] = useState(null); // For error feedback
  const [successMessage, setSuccessMessage] = useState(''); // For success feedback
  const [showForm, setShowForm] = useState(false); // To toggle form visibility

  // Feedback state variables
  const [feedbacks, setFeedbacks] = useState([]); // Store feedback data
  const [feedbackLoading, setFeedbackLoading] = useState(false); // For feedback loading state
  const [feedbackError, setFeedbackError] = useState(null); // For feedback fetching errors

  // Handle form input changes
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleFileChange = (e) => setImageFile(e.target.files[0]);
  const handleCredentialsChange = (e) => setAdminCredentials({ ...adminCredentials, [e.target.name]: e.target.value });

  // Handle admin login
  const handleLogin = (e) => {
    e.preventDefault();
    if (adminCredentials.username === 'sakshi' && adminCredentials.password === 'radhe111') {
      setIsAuthenticated(true);
    } else {
      alert('Invalid credentials!');
    }
  };

  // Handle restaurant submission
  const handleRestaurantSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage('');

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('address', formData.address);
    formDataToSend.append('cuisine', formData.cuisine);
    formDataToSend.append('price', formData.price);
    if (imageFile) formDataToSend.append('imageUpload', imageFile);

    try {
      const response = await fetch('http://localhost:5000/api/admin/add/restaurants', {
        method: 'POST',
        body: formDataToSend,
      });
      if (!response.ok) throw new Error('Failed to add restaurant');
      setSuccessMessage('Restaurant added successfully');
      setFormData({ name: '', address: '', cuisine: '', price: '' });
      setImageFile(null);
      fetchRestaurants();
    } catch (error) {
      console.error('Error adding restaurant:', error);
      setError('Error adding restaurant!');
    } finally {
      setLoading(false);
    }
  };

  // Fetch restaurants data
  const fetchRestaurants = async () => {
    setLoading(true);
    const data = [
      { name: 'Swaad bhavan', searchCount: 70 },
      { name: 'Masala magic', searchCount: 80 },
      { name: 'swaad ghar', searchCount: 45 },
      { name: 'Zaika junction', searchCount: 10 },
      { name: 'Tandoor Tales', searchCount: 50 },
      { name: 'Flavours of India', searchCount: 20 },
    ];
    setRestaurants(data);
    setFilteredRestaurants(data);
    calculateSearchStats(data);
    setLoading(false);
  };

  const calculateSearchStats = (restaurants) => {
    const mostSearched = restaurants.sort((a, b) => b.searchCount - a.searchCount).slice(0, 3);
    const leastSearched = restaurants.sort((a, b) => a.searchCount - b.searchCount).slice(0, 3);
    setSearchStats({ mostSearched, leastSearched });
  };

  // Fetch feedback data
  const fetchFeedback = async () => {
    setFeedbackLoading(true);
    setFeedbackError(null);
    try {
      const response = await fetch('http://localhost:5000/api/feedback');
      if (!response.ok) throw new Error('Failed to fetch feedback');
      const data = await response.json();
      setFeedbacks(data.data); // Assuming the feedback is in data.data
    } catch (error) {
      console.error('Error fetching feedback:', error);
      setFeedbackError('Failed to load feedback');
    } finally {
      setFeedbackLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchRestaurants();
      fetchFeedback();
    }
  }, [isAuthenticated]);

  return (
    <div className="admin-dashboard">

      {!isAuthenticated ? (
        <form onSubmit={handleLogin} className="auth-form">
          <h1>Admin Login</h1>
          <input
            type="text"
            name="username"
            placeholder="Admin Username"
            value={adminCredentials.username}
            onChange={handleCredentialsChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Admin Password"
            value={adminCredentials.password}
            onChange={handleCredentialsChange}
          />
          <button type="submit">Login</button>
        </form>
      ) : (
        <div className="dashboard-content">
          <button onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Hide Form' : 'Add Restaurant'}
          </button>

          {showForm && (
            <form onSubmit={handleRestaurantSubmit} encType="multipart/form-data" className="data-form">
              <h1>Add Restaurant</h1>
              <input type="text" name="name" placeholder="Restaurant Name" value={formData.name} onChange={handleChange} />
              <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} />
              <input type="text" name="cuisine" placeholder="Cuisine" value={formData.cuisine} onChange={handleChange} />
              <input type="text" name="price" placeholder="Price" value={formData.price} onChange={handleChange} />
              <input type="file" onChange={handleFileChange} />
              <button type="submit">Add Restaurant</button>
            </form>
          )}

          {loading && <p>Loading...</p>}
          {error && <p className="error">{error}</p>}
          {successMessage && <p className="success">{successMessage}</p>}

          {/* Feedback Section */}
          <div className="feedback-section">
            <h2>Customer Feedback</h2>
            {feedbackLoading ? (
              <p>Loading feedback...</p>
            ) : feedbackError ? (
              <p className="error">{feedbackError}</p>
            ) : (
              feedbacks.map((feedback, index) => (
                <div className="feedback-box" key={index}>
                  <p><strong>Name:</strong> {feedback.name}</p>
                  <p><strong>Experience:</strong> {feedback.experience}</p>
                  <p><strong>Message:</strong> {feedback.message}</p>
                  <p><strong>Suggestion:</strong> {feedback.suggestion}</p>
                </div>
              ))
            )}
          </div>

          {/* Charts for most and least searched restaurants */}
          <div className="charts-container">
            <div className="chart">
              <h2>Most Searched Restaurants</h2>
              {searchStats.mostSearched.length > 0 ? (
                <Pie
                  data={{
                    labels: searchStats.mostSearched.map((r) => r.name),
                    datasets: [
                      {
                        data: searchStats.mostSearched.map((r) => r.searchCount),
                        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                      },
                    ],
                  }}
                />
              ) : (
                <p>No data available for most searched restaurants</p>
              )}
            </div>
            <hr className='chart-separator' />
            <div className="chart">
              <h2>Least Searched Restaurants</h2>
              {searchStats.leastSearched.length > 0 ? (
                <Pie
                  data={{
                    labels: searchStats.leastSearched.map((r) => r.name),
                    datasets: [
                      {
                        data: searchStats.leastSearched.map((r) => r.searchCount),
                        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                      },
                    ],
                  }}
                />
              ) : (
                <p>No data available for least searched restaurants</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );

};

export default AdminDashboard;