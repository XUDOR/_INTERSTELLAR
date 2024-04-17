//index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import AppWrapper from './AppWrapper'; // Ensures all contexts and routers are included
import './index.css';
//import reportWebVitals from './reportWebVitals';
import axios from 'axios';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5001';  
axios.defaults.baseURL=API_BASE_URL;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);



// Optional: Performance logging
//reportWebVitals(console.log);
