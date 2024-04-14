//index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import AppWrapper from './AppWrapper'; // Ensures all contexts and routers are included
import './index.css';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);

console.log('ReactDOM rendered');

// Optional: Performance logging
reportWebVitals(console.log);
