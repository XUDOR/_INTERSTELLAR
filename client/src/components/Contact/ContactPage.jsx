import React from 'react';
import './ContactPage.css'; 

const ContactPage = () => {
  return (
    <>
      <div className="ContactContent"> 
        <div className='ContactTitle'>Contact</div>  
      </div>
      <div className="ContactDetails">
        <div className="Column1">Roderick Shoolbraid</div>
        <div className="Column2">
          778 922 8992 <br />
          rdxenv@gmail.com <br />
          interstellarpackages@gmail.com
        </div>
      </div>
    </>
  );
};

export default ContactPage;
