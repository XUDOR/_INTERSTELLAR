// src/AppWrapper.jsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App'; // Adjust the import path if your file structure is different

const AppWrapper = () => {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
