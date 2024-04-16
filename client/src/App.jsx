// App.jsx
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import LoadingPage from './components/Loading/LoadingPage';
import Header from './components/Header/Header';
import Main from './components/MainSection/Main';
import Footer from './components/Footer/Footer';
import ShopPage from './components/ShopCart/ShopPage';
import FilmPage from './components/Film/FilmPage';
import DownloadsPage from './components/Downloads/DownloadsPage';
import ContactPage from './components/Contact/ContactPage';
import { useCentralQueue } from './Contexts/CentralQueueContext'; // Ensure the path is correct

import './App.css';

const App = () => {
  const { isLoading, queue, currentSongIndex } = useCentralQueue(); // Corrected variable name
  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
    console.log("App component mounted or updated.");
    // Simulate a loading delay
    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 1500); // Delay in milliseconds

    return () => clearTimeout(timer);
  }, []);

  if (isPageLoading || isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="app">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/Film" element={<FilmPage />} />
          <Route path="/downloads" element={<DownloadsPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
