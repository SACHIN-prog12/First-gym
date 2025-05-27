import React from 'react';
//import { useNavigate } from 'react-router-dom';
import './dashboard.css';

const Dashboard = () => {
  return (
    <div className="gym-container">
     {/* Hero Section */}
      <section className="hero-section">
      <img src="./logo.png" alt="Gym Logo" className="hero-logo" />
         <img src="./metric1.png" alt="Metrics" className="Metrics" />
        <img src="/loginbackground.png" alt="Hero" className="hero-bg" />
        
        <div className="hero-overlay">
          
          <h1>Keep your body<br />healthy<br />& in shape</h1>
          <p>
            In order to stay in shape and stay healthy, it is necessary to take a variety of steps, including a balanced and active lifestyle.
          </p>
          <button className="join-btn">Join Now</button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <h2>We raise your <br /><span>Confidence</span></h2>
        <div className="stats">
          <div><strong>10k+</strong><p>Members</p></div>
          <div><strong>60+</strong><p>Fitness</p></div>
          <div><strong>42+</strong><p>Best Coaches</p></div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <h3>We provide the best service to increase your confidence</h3>
        <div className="services">
          <div className="service"><img src="/boxing.png" alt="Boxing" /><p>BOXING</p></div>
          <div className="service"><img src="/yoga.png" alt="Yoga" /><p>YOGA</p></div>
          <div className="service"><img src="/phonebg.png" alt="Crossfit" /><p>CROSSFIT</p></div>
          </div>
      </section>

      {/* Build Section */}
      <section className="build-section">
      
        <div className="build-text">
          <h2><span>BUILD</span> YOUR BODY<br />TRANSFORM YOUR LIFE</h2>
          <img src="/transform.jpg" alt="Transform" className="build-image" />
           </div>
      </section>


      <footer>
  <div class="footer-container">
    <div class="footer-contact">
      <h4>Contact Us</h4>
      <p>OG Gym</p>
      <p>123 Fitness Street, Prayagraj, UP</p>
      <p>Email: <a href="mailto:info@oggym.com">info@oggym.com</a></p>
      <p>Phone: <a href="tel:+919876543210">+91 9876543210</a></p>
  
    </div>
  </div>
  <div class="footer-bottom">
    <p>&copy; 2025 OG Gym. All rights reserved. | <a href="/privacy">Privacy Policy</a> | <a href="/terms">Terms of Service</a></p>
  </div>
  </footer>

    </div>
    
  );
};

export default Dashboard;
