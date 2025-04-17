import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add login logic here
    console.log('Login attempted with:', email, password);
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };

  const handleChangePasswordClick = () => {
    navigate('/change-password');
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Welcome Back</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        
        <div className="additional-options">
          <button onClick={handleSignupClick} className="signup-button">
            Create Account
          </button>
          <button onClick={handleChangePasswordClick} className="change-password-button">
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
