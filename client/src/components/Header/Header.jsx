// Header.jsx
import React from 'react';
import Brand from './Brand';

import Contact from './Contact';
import { useHeaderStyle } from '../../hooks/useHeaderStyle'; 
import './Header.css';

const Header = () => {
  const { isMinimal, headerClassName } = useHeaderStyle();

  return (
    <header className={`header ${headerClassName}`}>
      <Brand />
      
      {!isMinimal && <Contact />}
    </header>
  );
};

export default Header;
  