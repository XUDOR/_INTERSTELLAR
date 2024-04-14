import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { MusicDataProvider } from './Contexts/MusicDataContext';
import { CentralQueueProvider } from './Contexts/CentralQueueContext'; // Ensure it's imported correctly

const AppWrapper = () => {
  return (
    <Router>
      <MusicDataProvider> {/* First level context for music data */}
        <CentralQueueProvider> {/* Second level context specifically for queue management */}
          <App />
        </CentralQueueProvider>
      </MusicDataProvider>
    </Router>
  );
}

export default AppWrapper;
