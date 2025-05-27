import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

//import App from './App'; 
//import { BrowserRouter } from 'react-router-dom'; 
//import Dashboard from './Dashboard';
import LandingPage from './LandingPage';
import AuthPage from './AuthPage';
import Dash from './Dash';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <Dash/>
  </React.StrictMode>
);
