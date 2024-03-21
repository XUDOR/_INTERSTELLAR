// Footer.jsx, located at src/components/Footer/Footer.jsx
import React from 'react';
import Player from './Player';
import Radio from './Radio';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="Footer">
      <Player />
     
      <Radio />
    </footer>
  );
};

export default Footer;