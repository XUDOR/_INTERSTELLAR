//SocialMedia.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './SocialMedia.css';

const SocialMedia = () => {
  return (
    <div className="social-media">
      Social Media | <Link to="/contact" className="contact-link">Contact</Link>
    </div>
  );
};

export default SocialMedia;
