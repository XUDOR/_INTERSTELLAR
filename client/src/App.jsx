import React, { useEffect } from 'react';
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
import { useCentralQueue } from './Contexts/CentralQueueContext'; // Ensure the path is correct
import './App.css';

const App = () => {
  const { isLoading, queue, currentIndexID } = useCentralQueue(); // Assuming this hook provides what you need
  console.log({ isLoading, queue, currentIndexID }); // Debug: log out these values to see what you're getting

  useEffect(() => {
    console.log("App component mounted or updated.");
  }, []);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
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
  );
};

export default App;
