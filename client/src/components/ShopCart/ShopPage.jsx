import React, { useState } from 'react';
import Cart from './Cart';
import ProductList from './ProductList';

import './ShopPage.css';
import './Cart.css';

const ShopPage = () => {
  // Example products data
  const [products, setProducts] = useState([
    { id: 1, name: 'Apple', price: 0.99 },
    { id: 2, name: 'Banana', price: 0.79 },
    { id: 3, name: 'Cherry', price: 1.29 }
  ]);

  // Example cart items data
  const [cartItems, setCartItems] = useState([]);

  // Function to handle adding products to the cart
  const onAddToCart = (product) => {
    const exist = cartItems.find(x => x.id === product.id);
    if (exist) {
      setCartItems(cartItems.map(x => x.id === product.id ? { ...exist, quantity: exist.quantity + 1 } : x));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  // Function to handle removing products from the cart
  const onRemoveFromCart = (id) => {
    const exist = cartItems.find(x => x.id === id);
    if (exist.quantity === 1) {
      setCartItems(cartItems.filter(x => x.id !== id));
    } else {
      setCartItems(cartItems.map(x => x.id === id ? { ...exist, quantity: exist.quantity - 1 } : x));
    }
  };

  return (
    <div className="shopContent">
      
      <ProductList products={products} onAddToCart={onAddToCart} />
      <Cart className='cartItems'cartItems={cartItems} onRemoveFromCart={onRemoveFromCart} />
      <div className='shopTitle'>Shop</div>
    </div>
  );
};

export default ShopPage;
