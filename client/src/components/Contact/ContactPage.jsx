import React from 'react';
import './ContactPage.css';

const ContactPage = () => {
  return (
    <div className="ContactContent">
      <div className="MasterContainer">
        <div className="Container1">
          <div className="Picture">
            {/* Include the image directly in JSX */}
            <img src="/pictures/RODERICK_SHOOLBRAID-PROMO1_2022sm.png" alt="Roderick Shoolbraid Promo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div className="Info1">
            <p>Contact Details</p>
          </div>
        </div>
        <div className="Container2">
          <div className="Info2">
            <p>Bio / EPK</p>
          </div>
        </div>
        <div className="Container3">
          <form action="mailto:interstellarpackages@gmail.com" method="post" encType="text/plain">
            <div className="FormField-name">
              <label htmlFor="name">Name:</label>
              <input className="nameInput" type="text" id="name" name="name" />
            </div>
            <div className="FormField-email">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" />
            </div>
            <div className="FormField-date">
              <label htmlFor="date">Date:</label>
              <input type="date" id="date" name="date" />
            </div>
            <div className="FormField-formContent">
              <label className="formContent" htmlFor="content">Content:</label>
              <textarea id="content" name="content"></textarea>
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
