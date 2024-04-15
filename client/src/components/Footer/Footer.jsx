import React from 'react';
import Player from './Player';
import Queue from './Queue';
import Shop from './Shop';

import User from './User';
import Downloads from './Downloads';
import './Footer.css';

const Footer = () => {
  return (
    <div className="AppContainer">
      <footer className="Footer">
        <Downloads />
        <User />
        <Player />  
        <Shop />
      </footer>
      <Queue />
    </div>
  );
};

export default Footer;
