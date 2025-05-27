import React, { useEffect } from 'react';
//import { useNavigate } from 'react-router-dom';
import './Dash.css';

const Dash = () => {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-visible');
        } else {
          entry.target.classList.remove('fade-in-visible');
        }
      });
    }, observerOptions);

    // Observe all sections with fade-in-section class
    const sections = document.querySelectorAll('.fade-in-section');
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="gym-container">
      {/* Hero Section */}
      <section className="hero-section fade-in-section">
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
      <section className="stats-section fade-in-section">
        <h2>We raise your <br /><span>Confidence</span></h2>
        <div className="stats">
          <div><strong>10k+</strong><p>Members</p></div>
          <div><strong>60+</strong><p>Fitness</p></div>
          <div><strong>42+</strong><p>Best Coaches</p></div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section fade-in-section">
        <h3>We provide the best service to increase your confidence</h3>
        <div className="services">
          <div className="service"><img src="/boxing.png" alt="Boxing" /><p>BOXING</p></div>
          <div className="service"><img src="/yoga.png" alt="Yoga" /><p>YOGA</p></div>
          <div className="service"><img src="/phonebg.png" alt="Crossfit" /><p>CROSSFIT</p></div>
          </div>
      </section>

      {/* Pricing Plans Section */}
      <section className="pricing-section fade-in-section">
        <h2>Choose Your Plan</h2>
        <p className="pricing-subtitle">Find the perfect plan that fits your fitness journey</p>
        <div className="pricing-container">
          <div className="pricing-card">
            <h3>Basic Plan</h3>
            <div className="price">
              <span className="currency">₹</span>
              <span className="amount">999</span>
              <span className="period">/month</span>
            </div>
            <ul className="features">
              <li>• Access to gym equipment</li>
              <li>• Locker facility</li>
              <li>• Basic training guidance</li>
              <li>• Free Wi-Fi</li>
            </ul>
            <button className="choose-plan-btn">Choose Plan</button>
          </div>

          <div className="pricing-card">
            <h3>Premium Plan</h3>
            <div className="price">
              <span className="currency">₹</span>
              <span className="amount">1999</span>
              <span className="period">/month</span>
            </div>
            <ul className="features">
              <li>• All Basic features</li>
              <li>• Personal trainer</li>
              <li>• Diet consultation</li>
              <li>• Group classes</li>
              <li>• Sauna access</li>
            </ul>
            <button className="choose-plan-btn">Choose Plan</button>
          </div>

          <div className="pricing-card">
            <h3>Elite Plan</h3>
            <div className="price">
              <span className="currency">₹</span>
              <span className="amount">2999</span>
              <span className="period">/month</span>
            </div>
            <ul className="features">
              <li>• All Premium features</li>
              <li>• 1-on-1 sessions</li>
              <li>• Nutrition supplements</li>
              <li>• Priority booking</li>
              <li>• Massage therapy</li>
            </ul>
            <button className="choose-plan-btn">Choose Plan</button>
          </div>
        </div>
      </section>

      {/* Build Section */}
      <section className="build-section fade-in-section">
      
        <div className="build-text">
          <h2><span>BUILD</span> YOUR BODY<br />TRANSFORM YOUR LIFE</h2>
          <img src="/transform.jpg" alt="Transform" className="build-image" />
           </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section fade-in-section">
        <h2>What Our Members Say</h2>
        <p className="testimonials-subtitle">Real stories from real people who transformed their lives</p>
        <div className="testimonials-container">
          <div className="testimonial-card">
            <div className="member-avatar">👨‍💼</div>
            <h4>Rajesh Kumar</h4>
            <div className="rating">
              <span>⭐⭐⭐⭐⭐</span>
            </div>
            <p className="testimonial-text">
              "The OG Gym transformed my life completely. Lost 25kg in 6 months!"
            </p>
          </div>

          <div className="testimonial-card">
            <div className="member-avatar">👩‍💼</div>
            <h4>Priya Sharma</h4>
            <div className="rating">
              <span>⭐⭐⭐⭐⭐</span>
            </div>
            <p className="testimonial-text">
              "Best trainers in the city. They really care about your progress."
            </p>
          </div>

          <div className="testimonial-card">
            <div className="member-avatar">👨‍💻</div>
            <h4>Amit Singh</h4>
            <div className="rating">
              <span>⭐⭐⭐⭐⭐</span>
            </div>
            <p className="testimonial-text">
              "Clean facility, modern equipment, and great community atmosphere."
            </p>
          </div>

          <div className="testimonial-card">
            <div className="member-avatar">👩‍🎓</div>
            <h4>Sneha Patel</h4>
            <div className="rating">
              <span>⭐⭐⭐⭐⭐</span>
            </div>
            <p className="testimonial-text">
              "Amazing results in just 3 months. The trainers are so supportive!"
            </p>
          </div>

          <div className="testimonial-card">
            <div className="member-avatar">👨‍🔬</div>
            <h4>Vikram Joshi</h4>
            <div className="rating">
              <span>⭐⭐⭐⭐⭐</span>
            </div>
            <p className="testimonial-text">
              "Professional environment with top-notch equipment. Highly recommended!"
            </p>
          </div>
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

export default Dash;