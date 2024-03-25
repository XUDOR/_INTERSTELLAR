// Header.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import Brand from './Brand';
import ArtistsReleases from './ArtistsReleases';
import SocialMedia from './SocialMedia';
import './Header.css';

const Header = ({ className }) => {
  const location = useLocation();
  const minimal = location.pathname === '/shop';
  
  const headerClasses = `header ${className || ''}`.trim();

  return (
    <header className={headerClasses}>
      <Brand />
      {!minimal && <ArtistsReleases />}
      {!minimal && <SocialMedia />}
    </header>
  );
};

export default Header;
