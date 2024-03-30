import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Main from './components/MainSection/Main';
import Footer from './components/Footer/Footer';
import ShopPage from './components/ShopCart/ShopPage';
import AdminPage from './components/Admin/AdminPage';
import UserPage from './components/User/UserPage';
import DownloadsPage from './components/Downloads/DownloadsPage';
import EPKPage from './components/EPKPage/EPKPage';
import ContactPage from './components/Contact/ContactPage';
import { TabProvider } from './Contexts/TabContext';
import { AlbumProvider } from './Contexts/AlbumContext'; // Ensure this path is correct based on your project structure
import { useHeaderStyle } from './hooks/useHeaderStyle';
import './App.css';

const App = () => {
  const { isMinimal } = useHeaderStyle();

  return (
    <AlbumProvider> {/* Wrap the entire application with AlbumProvider */}
      <TabProvider> {/* Then, wrap the content within TabProvider */}
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
      </TabProvider>
    </AlbumProvider>
  );
};

export default App;
