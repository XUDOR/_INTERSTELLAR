// AppWrapper.jsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App'; // Adjust the import path if your file structure is different
import { MusicDataProvider } from './Contexts/MusicDataContext';  // Import the provider

const AppWrapper = () => {
  return (
    <Router>
      <MusicDataProvider>  {/* Wrap the App component with MusicDataProvider*/}
        <App />
      </MusicDataProvider>
    </Router>
  );
}

export default AppWrapper;
