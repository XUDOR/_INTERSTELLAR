// App.js
import React, { useState, useEffect,useRef } from 'react';
import { Routes, Route } from 'react-router-dom';
import { MusicDataProvider } from './Contexts/MusicDataContext';
import LoadingPage from './components/Loading/LoadingPage';
import Header from './components/Header/Header';
import Main from './components/MainSection/Main';
import Footer from './components/Footer/Footer';
import ShopPage from './components/ShopCart/ShopPage';
import AdminPage from './components/Admin/AdminPage';
import UserPage from './components/User/UserPage';
import DownloadsPage from './components/Downloads/DownloadsPage';
import EPKPage from './components/EPKPage/EPKPage';
import ContactPage from './components/Contact/ContactPage';
import './App.css';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1.0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [audioFileName,setaudioFIleName] =useState(null
    //"https://github.com/rafaelreis-hotmart/Audio-Sample-files/raw/master/sample.mp3"
  );
  const audioPlayer = useRef();

  // File name for display. If the audio file path is static, this can remain constant.
  //const audioFileName = "https://github.com/rafaelreis-hotmart/Audio-Sample-files/raw/master/sample.mp3"; // Directly using the file name since the path is static

  // Toggles the play/pause state
  const togglePlayPause = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    if (!prevValue) {
      audioPlayer.current.play();
    } else {
      audioPlayer.current.pause();
    }
  };

  // Sets the duration once audio metadata is loaded
  const handleLoadedData = () => {
    setDuration(audioPlayer.current.duration);
    if (isPlaying) audioPlayer.current.play();
  };

  // Updates the current time as the audio plays
  const handleTimeUpdate = () => {
    if (!isSeeking) {
      setCurrentTime(audioPlayer.current.currentTime);
    }
  };

  // Handles the change in volume
  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    audioPlayer.current.volume = newVolume;
    setVolume(newVolume);
  };

  // Handles the change in the seek bar
  const handleSeekChange = (e) => {
    const newTime = e.target.value;
    audioPlayer.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // Indicates the user has started dragging the seek bar
  const handleSeekMouseDown = () => {
    setIsSeeking(true);
  };

  // Indicates the user has finished dragging the seek bar
  const handleSeekMouseUp = () => {
    setIsSeeking(false);
    audioPlayer.current.currentTime = currentTime;
  };

  // Converts the time in seconds to a displayable format
  const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
  };


  useEffect(() => {
    // Instead of setTimeout, here you could fetch your initial app data 
    // and set isLoading to false once the data is loaded.
    const loadData = async () => {
      // Simulate data fetching
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsLoading(false);
    };

    loadData();
  }, []);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <MusicDataProvider>
      <div className="app">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Main 
            setaudioFIleName={setaudioFIleName}
            
            />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/user" element={<UserPage />} />
            <Route path="/downloads" element={<DownloadsPage />} />
            <Route path="/epk" element={<EPKPage />} />
            <Route path="/contact" element={<ContactPage />} />
            {/* Ensure all your routes are listed here */}
          </Routes>
        </main>
        <Footer
        audioFileName={audioFileName}
        handleLoadedData={handleLoadedData}
        handleTimeUpdate={handleTimeUpdate}
        setIsPlaying={setIsPlaying}
        handleSeekMouseDown={handleSeekMouseDown}
        handleSeekMouseUp={handleSeekMouseUp}
        handleSeekChange={handleSeekChange}
        handleVolumeChange={handleVolumeChange}
        volume={volume}  
        duration={duration} 
        togglePlayPause={togglePlayPause}
        audioPlayer={audioPlayer}
        calculateTime={calculateTime}
        currentTime={currentTime}
        isPlaying={isPlaying}
        isSeeking={isSeeking}
        
        />
      </div>
    </MusicDataProvider>
  );
};

export default App;
