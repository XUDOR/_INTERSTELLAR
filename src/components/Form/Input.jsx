import React, { useState } from 'react';
import './Input.css';

// Updated Input component to accept a callback function
const Input = ({ onSubmit }) => {
  const [value, setValue] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitting value:", value);
    onSubmit(value); // Call the passed-in callback function with the current value
    setValue(''); // Optionally reset the input value
  };

  return (
    <form onSubmit={handleSubmit} className="InputForm">
      
      <div className='InputTitle'>Input:</div>
      <input
        type="number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="InputField"
      />
      <button type="submit" className="SubmitButton">Submit</button>
    </form>
  
  );
  
};

export default Input;
