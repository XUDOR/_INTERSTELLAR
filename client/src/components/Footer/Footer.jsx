import React from 'react';
import Player from './Player';
import Queue from './Queue';
import Shop from './Shop';
import Nav from './Nav';
import Admin from './Admin';
import User from './User';
import Downloads from './Downloads';
import './Footer.css';

const Footer = () => {
  return (
    <div className="AppContainer">
      <footer className="Footer">
        <Admin />
        <Downloads />
        <User />
        <Nav />
        <Player />  
        <Shop />
      </footer>
      <Queue />
    </div>
  );
};

export default Footer;
