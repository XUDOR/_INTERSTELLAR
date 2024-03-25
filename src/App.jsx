import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import React from 'react';
import Header from './components/Header/Header'; 
import Main from './components/MainSection/Main';
import Footer from './components/Footer/Footer';
import ShopPage from './components/ShopCart/ShopPage';
import AdminPage from './components/Admin/AdminPage';
import './App.css'; 

const AppWrapper = () => {
  return (
    <Router>
      <App />
    </Router>
  );
}

const App = () => {
  let location = useLocation(); // This hook must be used within a component that is a child of <Router>

  const isMinimalLayout = location.pathname === '/shop' || location.pathname === '/admin';

  return (
    <div className="app">
      {!isMinimalLayout && <Header />}
      <main>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/shop" element={<ShopPage minimalHeader={true} />} />
          <Route path="/admin" element={<AdminPage minimalHeader={true} />} />
        </Routes>
      </main>
      {!isMinimalLayout && <Footer />}
    </div>
  );
}

export default AppWrapper;
