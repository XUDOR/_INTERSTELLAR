// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Main from './components/MainSection/Main';
import Footer from './components/Footer/Footer';
import ShopPage from './components/ShopCart/ShopPage';
import AdminPage from './components/Admin/AdminPage';
import UserPage from './components/User/UserPage';
import { useHeaderStyle } from './hooks/useHeaderStyle'; // Make sure to use the correct path
import './App.css';

const App = () => {
  const { isMinimal } = useHeaderStyle();

  return (
    <div className="app">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/user" element={<UserPage />} />
        </Routes>
      </main>
      {!isMinimal && <Footer />}
    </div>
  );
};

const AppWrapper = () => {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
