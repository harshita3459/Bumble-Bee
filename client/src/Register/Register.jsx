import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import SweetAlert2
import './Register.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/register', {
        name,
        email,
        password,
      });

      // Success alert using SweetAlert2
      Swal.fire({
        title: 'Registered Successfully!',
        text: 'Your account has been created. Please log in.',
        icon: 'success',
        confirmButtonText: 'Proceed to Login'
      }).then(() => {
        navigate('/login');
      });

    } catch (error) {
      console.error('Error registering:', error.message);

      // Error alert using SweetAlert2
      Swal.fire({
        title: 'Registration Failed!',
        text: 'There was an error creating your account. Please try again.',
        icon: 'error',
        confirmButtonText: 'Retry'
      });
    }
  };

  return (
    <div className="register-container">
      <div className='overlay'>
      <div className="register-content">
        <h2>Register</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <button onClick={handleRegister}>Register</button>
        <p>
          Already have an account?{' '}
          <button onClick={() => navigate('/login')}>Login</button>
        </p>
      </div>
    </div>
    </div>
  );
};

export default Register;
