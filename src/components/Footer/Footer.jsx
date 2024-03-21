// Footer.jsx, located at src/components/Footer/Footer.jsx
import React from 'react';
import Player from './Player';
import Radio from './Radio';
import Shop from './Shop';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="Footer">
      <Player />
      <Radio />
      <Shop />
    </footer>
  );
};

export default Footer;