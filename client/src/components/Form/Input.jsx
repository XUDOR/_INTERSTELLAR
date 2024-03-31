import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Input.css';

const Input = ({ onSubmit }) => {
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (value.trim() !== '') {
      onSubmit(value.trim());
      setValue('');
    } else {
      alert('Please enter a valid value.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="InputForm">
      <div className='InputTitle'>
        Tab #:
        <input
          type="number"
          value={value}
          onChange={handleChange}
          className="InputField"
          placeholder="Enter a value"
        />
        <button type="submit" className="SubmitButton">Submit</button>
      </div>
    </form>
  );
};

Input.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Input;
