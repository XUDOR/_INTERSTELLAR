import React from "react";

const Total = ({ cartItems = [] }) => { // Set a default value of an empty array for cartItems
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="total">
      <h3 className="total-text">Total: ${total.toFixed(2)}</h3>
    </div>
  );
};

export default Total;
