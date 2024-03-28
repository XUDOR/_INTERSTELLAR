import React from "react";

const CartItem = ({ item, onRemoveFromCart, onDecreasedQuantity}) => (
  <div className="cart-item">
    <span className="item-name">{item.name} x {item.quantity}</span>
    <span className="item-price">${(item.price * item.quantity).toFixed(2)}</span>
    <button className="remove-item" onClick={() => onRemoveFromCart(item.id)}>X</button>
  </div>
);

export default CartItem;