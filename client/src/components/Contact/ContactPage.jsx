// ContactPage.jsx
import React from 'react';
import './ContactPage.css'; 

const ContactPage = () => {
  return (
    <>
      <div className="ContactContent"> {/* Add this wrapper */}
        <div className='ContactTitle'>_Contact</div>
        <div className="MasterContainer">
          <div className="Container1">
            <div className="Picture">
              {/* Your picture goes here */}
            </div>
            <div className="Info1">
              {/* Info 1 content */}
              <p>Some text goes here</p>
            </div>
          </div>
          <div className="Container2">
            {/* Info 2 content */}
            <p>Some more text goes here</p>
          </div>
          <div className="Container3">
            <form action="mailto:interstellarpackages@gmail.com" method="post" encType="text/plain">
              <div className="FormField">
                
                <label htmlFor="name">Name:</label>
                <input classname="nameInput"type="text" id="name" name="name" />
              </div>
              <div className="FormField">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" />
              </div>
              <div className="FormField">
                <label htmlFor="date">Date:</label>
                <input type="date" id="date" name="date" />
              </div>
              <div className="FormField">
                <label className="formContent"htmlFor="content">Content:</label>
                <textarea id="content" name="content"></textarea>
              </div>
              <div className="FormField">
                <button className="submit"type="submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
