import React, { useState, useEffect } from 'react';
import './landingpage.css';
import phoneBg from './phonebg.png'; // Replace with your actual background image path
import logo from './logo.png'; // Replace with your actual logo image path

const quotes = [
  "A Community For You,\nChallenge Yourself",
  "Every Rep Counts,\nPush Beyond Limits",
  "Train Together,\nGrow Stronger"
];

export default function LandingPage() {
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 4000); // change quote every 4 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    
    <div className="container">
      <div className="phone-frame">
     
        <img src={phoneBg} alt="Background" className="phone-img" />
        <img src={logo} alt="Logo" className="logo" />

        <div className="overlay">
          <div className="blurred-box">
            <p className="quote-text fade-in">{quotes[quoteIndex]}</p>
            <div className="dots">
              {quotes.map((_, idx) => (
                <div key={idx} className={`dot ${idx === quoteIndex ? 'active' : ''}`} />
              ))}
            </div>
          </div>
          <button className="get-started">Get Started</button>
        </div>
      </div>
    </div>
  );
}

