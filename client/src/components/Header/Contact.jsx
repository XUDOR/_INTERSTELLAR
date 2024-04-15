//SocialMedia.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Contact.css';

const Contact = () => {
  return (
    <div className="Contact">
       <Link to="/contact" className="contact-link">Contact</Link>
    </div>
  );
};

export default Contact;
