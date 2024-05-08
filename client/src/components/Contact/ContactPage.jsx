import React, { useState } from 'react';
import './ContactPage.css';
import axios from 'axios'; // Import axios

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    content: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    try {
      // Making the POST request to the server using axios
      const response = await axios.post('/api/contact/send-contact-email', {
        name: formData.name,
        email: formData.email,
        date: formData.date,
        content: formData.content
      });

      if (response.status === 200) {
        alert('Email sent successfully!');
        // Clear form data after successful submission
        setFormData({ name: '', email: '', date: '', content: '' });
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      // Handle any errors that occur during the submission
      console.error('Failed to send email:', error);
      alert('Failed to send email. Please try again later.');
    }
  };

  return (
    <div className="ContactContent">
      <div className="MasterContainer">
        <div className="Container1">
          <div className="Picture">
            <img src="/pictures/RODERICK_SHOOLBRAID-PROMO1_2022sm.png" alt="Roderick Shoolbraid Promo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div className="Info1">
            <p className='Contact-text'>Contact: Roderick Shoolbraid | 1 778 922 8992</p>
          </div>
        </div>
        <div className="Container2">
          <div className="Info2">
            <p>Bio / EPK</p>
          </div>
        </div>
        <div className="Container3">
          <form onSubmit={handleSubmit}>
            <div className="FormField-name">
              <label htmlFor="name">Name:</label>
              <input className="nameInput" type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
            </div>
            <div className="FormField-email">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
            </div>
            <div className="FormField-date">
              <label htmlFor="date">Date:</label>
              <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} />
            </div>
            <div className="FormField-formContent">
              <label className="formContent" htmlFor="content">Content:</label>
              <textarea id="content" name="content" value={formData.content} onChange={handleChange}></textarea>
            </div>
            <div className="FormField-submit">
              <button className="submit" type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
