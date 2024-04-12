import React, { useState, useEffect, useRef } from 'react';
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
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1.0);
  const [isSeeking, setIsSeeking] = useState(false);
  
  const audioPlayer = useRef();

  useEffect(() => {
    const loadData = async () => {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsLoading(false);
    };
    loadData();
  }, []);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (audioPlayer.current) {
      isPlaying ? audioPlayer.current.pause() : audioPlayer.current.play();
    }
  };

  const handleLoadedData = () => {
    if (audioPlayer.current) {
      setDuration(audioPlayer.current.duration);
      if (isPlaying) audioPlayer.current.play();
    }
  };

  const handleTimeUpdate = () => {
    if (!isSeeking && audioPlayer.current) {
      setCurrentTime(audioPlayer.current.currentTime);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    if (audioPlayer.current) {
      audioPlayer.current.volume = newVolume;
      setVolume(newVolume);
    }
  };

  const handleSeekChange = (e) => {
    const newTime = parseFloat(e.target.value);
    if (audioPlayer.current) {
      audioPlayer.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleSeekMouseDown = () => setIsSeeking(true);
  
  const handleSeekMouseUp = () => setIsSeeking(false);

  const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <MusicDataProvider>
      <div className="app">
        <Header />
        <main>
          <Routes>
          <Route path="/" element={<Main setCurrentSong={setCurrentSong} />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/user" element={<UserPage />} />
            <Route path="/downloads" element={<DownloadsPage />} />
            <Route path="/epk" element={<EPKPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        <Footer
          currentSong={currentSong}
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


























