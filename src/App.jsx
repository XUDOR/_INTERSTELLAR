import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import React from 'react';
import Header from './components/Header/Header'; 
import Main from './components/MainSection/Main';
import Footer from './components/Footer/Footer';
import ShopPage from './components/Shop-Cart/ShopPage';
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

  return (
    <div className="app">
      {location.pathname !== '/shop' && <Header />}
      <main>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/shop" element={<ShopPage minimalHeader={true} />} />
        </Routes>
      </main>
      {location.pathname !== '/shop' && <Footer />}
    </div>
  );
}

export default AppWrapper;
