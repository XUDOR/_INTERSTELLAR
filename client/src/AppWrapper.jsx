import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { MusicDataProvider } from './Contexts/MusicDataContext';
import { CentralQueueProvider } from './Contexts/CentralQueueContext';
import { MediaControlProvider } from './Contexts/MediaControlContext'; // Import the Media Control Context
import { PlaybackProvider } from './Contexts/PlaybackContext';

const AppWrapper = () => {
  return (
    <Router>
      <MusicDataProvider> {/* First level context for music data */}
        <CentralQueueProvider> {/* Second level context specifically for queue management */}
          <MediaControlProvider> {/* Media Control context to manage playback across the app */}
          <PlaybackProvider>
            <App />
            </PlaybackProvider>
          </MediaControlProvider>
        </CentralQueueProvider>
      </MusicDataProvider>
    </Router>
  );
}

export default AppWrapper;
