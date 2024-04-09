// App.js
import React, { useState, useEffect } from 'react';
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
            <Route path="/" element={<Main />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/user" element={<UserPage />} />
            <Route path="/downloads" element={<DownloadsPage />} />
            <Route path="/epk" element={<EPKPage />} />
            <Route path="/contact" element={<ContactPage />} />
            {/* Ensure all your routes are listed here */}
          </Routes>
        </main>
        <Footer />
      </div>
    </MusicDataProvider>
  );
};

export default App;
