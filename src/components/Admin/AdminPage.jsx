import React from 'react';
import Input from '../Form/Input';
import './AdminPage.css';

const AdminPage = ({ onTabSubmit }) => {
  return (
    <>
      <div className="AdminContent">
      <Input onSubmit={onTabSubmit} />
        <div className='AdminTitle'>_Admin</div>
        
      </div>
    </>
  );
};

export default AdminPage;
