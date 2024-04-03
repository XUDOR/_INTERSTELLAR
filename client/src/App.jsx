import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
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
import { MusicDataProvider } from './Contexts/MusicDataContext';
import { useHeaderStyle } from './hooks/useHeaderStyle';
import './App.css';

const App = () => {
  const { isMinimal } = useHeaderStyle();
  const [isLoading, setIsLoading] = useState(true); // Initial loading state for the app

  useEffect(() => {
    // Simulate a loading time of 1-2 seconds (1500 milliseconds as an example)
    const timer = setTimeout(() => {
      setIsLoading(false); // Hide the loading page and show the app content
    }, 1500);

    // Cleanup function to clear the timer if the component unmounts
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    // Show the LoadingPage component while the app is in the loading state
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
          </Routes>
        </main>
        {!isMinimal && <Footer />}
      </div>
    </MusicDataProvider>
  );
};

export default App;
