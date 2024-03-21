// Header.jsx, located at src/components/Header/Header.jsx
import React from 'react';
import Brand from './Brand';
import ArtistsReleases from './ArtistsReleases';
import SocialMedia from './SocialMedia';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <Brand />
      <ArtistsReleases />
      <SocialMedia />
    </header>
  );
};

export default Header;
