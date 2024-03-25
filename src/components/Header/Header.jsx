// Header.jsx
import React from 'react';
import Brand from './Brand';
import ArtistsReleases from './ArtistsReleases';
import SocialMedia from './SocialMedia';
import { useHeaderStyle } from '../../hooks/useHeaderStyle'; // Update the path as necessary
import './Header.css';

const Header = () => {
  const { isMinimal, headerClassName } = useHeaderStyle();

  return (
    <header className={`header ${headerClassName}`}>
      <Brand />
      {!isMinimal && <ArtistsReleases />}
      {!isMinimal && <SocialMedia />}
    </header>
  );
};

export default Header;
