// Footer.jsx, located at src/components/Footer/Footer.jsx
import React from 'react';
import Player from './Player';
import Radio from './Radio';
import Shop from './Shop';
import Nav from './Nav';
import Admin from './Admin';
import User from './User';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="Footer">
      <Admin />
      <User />
      <Nav />
      <Player />
      <Radio />
      <Shop />
    </footer>
  );
};

export default Footer;