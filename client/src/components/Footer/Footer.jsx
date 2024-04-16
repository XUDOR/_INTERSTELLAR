import React from 'react';
import Player from './Player';
import Queue from './Queue';
import Shop from './Shop';

import Film from './Film';
import Downloads from './Downloads';
import './Footer.css';

const Footer = () => {
  return (
    <div className="AppContainer">
      <footer className="Footer">
        <Downloads />
        <Film />
        <Player />  
        <Shop />
      </footer>
      <Queue />
    </div>
  );
};

export default Footer;
