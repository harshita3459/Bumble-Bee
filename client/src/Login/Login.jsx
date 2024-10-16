import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert'; // Import SweetAlert
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });
      localStorage.setItem('token', data.token);

      // Display success alert
      swal({
        title: "Success!",
        text: "You have successfully logged in!",
        icon: "success",
        button: "Proceed",
      }).then(() => {
        navigate('/restaurants');
      });
      
    } catch (error) {
      console.error(error); // Log the error to the console
      // Display error alert
      swal({
        title: "Login Failed",
        text: "Invalid email or password. Please try again.",
        icon: "error",
        button: "Retry",
      });
    }
  };

  return (
    <div className="login-container">
      <div className='overlay'>
      <div className="login-content">
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
        <p>
          Don't have an account?{' '}
          <button onClick={() => navigate('/register')}>Register</button>
        </p>
      </div>
    </div>
    </div>
  );
};

export default Login;
