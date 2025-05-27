import React, { useState } from 'react';
import './AuthPage.css';

export default function AuthPage() {
  const [showSignup, setShowSignup] = useState(false);
  

  const handleGoogleLogin = () => {
    // Google login logic here
    alert('Google Login Clicked!');
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Want to become an OG?</h2>
        {!showSignup && (
          <button className="toggle-btn" onClick={() => setShowSignup(true)}>
            Sign Up
          </button>
        )}
        {showSignup && (
          <form className="form">
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <input type="tel" placeholder="WhatsApp Number" />
            <button type="submit">Register</button>
          </form>
        )}
        <hr />
        <h2 className="auth-title">Already an OG?</h2>
        <form className="form">
          <input type="text" placeholder="Name" />
          <input type="tel" placeholder="WhatsApp Number" />
          <button type="submit">Sign In</button>
          <p className="or">or</p>
          <button type="button" className="google-btn" onClick={handleGoogleLogin}>
            Sign In with Google
          </button>
        </form>
      </div>
    </div>
  );
}
