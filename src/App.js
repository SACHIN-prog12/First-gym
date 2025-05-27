import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import LandingPage from './LandingPage'; // make sure this file exists

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
       <Route path="/Landingpage" element={<LandingPage />} />
    </Routes>
  );
};

export default App;
