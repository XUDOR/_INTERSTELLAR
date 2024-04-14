import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { MusicDataProvider } from './Contexts/MusicDataContext';
import { CentralQueueProvider, useCentralQueue } from './Contexts/CentralQueueContext';
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
  const { isLoading, queue, currentIndexID } = useCentralQueue(); // Assuming this hook provides what you need

  useEffect(() => {
    // Simulate initial data loading
    const loadData = async () => {
      await new Promise(resolve => setTimeout(resolve, 1500));
      // Simulated loading complete
    };
    loadData();
  }, []);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <MusicDataProvider>
      <CentralQueueProvider>
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
          <Footer />
        </div>
      </CentralQueueProvider>
    </MusicDataProvider>
  );
};

export default App;
