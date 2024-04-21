// Header.jsx
import React from 'react';
import Brand from './Brand';
import Film from './Film';
import Contact from './Contact';
import { useHeaderStyle } from '../../hooks/useHeaderStyle'; 
import './Header.css';

const Header = () => {
  const { isMinimal, headerClassName } = useHeaderStyle();

  return (
    <header className={`header ${headerClassName}`}>
      <Brand />
      
      {!isMinimal && <Contact />}
      <Film/>
    </header>

  );
};

export default Header;
  