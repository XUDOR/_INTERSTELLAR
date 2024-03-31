// AdminPage.jsx

import React from 'react';
import Input from '../Form/Input';
import useDynamicTabs from '../../hooks/useDynamicTabs'; // Adjust the path as necessary
import './AdminPage.css';

// In AdminPage.jsx or wherever your AdminPage component is defined
const AdminPage = () => {
  const { updateTabLabels } = useDynamicTabs(); // Assuming useDynamicTabs is a custom hook for managing tabs

  const handleTabSubmit = (newValue) => {
    console.log("Received in AdminPage for submission:", newValue);
    // Convert newValue to a desired format or validate as necessary
    const newTabCount = parseInt(newValue, 10); // Example: converting string input to an integer
    // Update the tab labels or count here, for example:
    updateTabLabels([...Array(newTabCount).keys()].map(n => `${n + 1}`));
    // Assuming updateTabLabels expects an array of string labels
  };

  return (
    <>
      <div className="AdminContent">
        <div className='AdminTitle'>_Admin</div>
      </div>
      <Input onSubmit={handleTabSubmit} /> {/* Passing handleTabSubmit as the onSubmit prop */}
    </>
  );
};
console.log('AdminPage');
export default AdminPage;



