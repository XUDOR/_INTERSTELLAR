import React, { useState } from 'react';
import Cart from './Cart';
import ProductList from './ProductList';
import './ShopPage.css';

const ShopPage = () => {
  // eslint-disable-next-line
  const [products, setProducts] = useState([
    { id: 1, name: 'Charlotta', price: 9.00 },
    { id: 2, name: 'Objects & Particles', price: 7.00 },
    { id: 3, name: 'Glass City of Us', price: 7.00 },
    { id: 4, name: 'New Domes of Earth', price: 7.00 },
    { id: 5, name: 'Natura', price: 10.00 },
    { id: 6, name: 'Outer Corners', price: 8.00 },
    { id: 7, name: 'Nonagon', price: 10.00 },
    { id: 8, name: 'Ambient Garden One', price: 15.00 },
    { id: 9, name: 'Music for Seven Structures', price: 8.00 },
    { id: 10, name: 'Inner Moments of Light', price: 10.00 },
    { id: 11, name: 'Nocturnes & Reveries', price: 16.00 },
    { id: 12, name: 'Prefabrication', price: 11.00 },
    { id: 13, name: 'Vagary', price: 9.00 },
    { id: 14, name: 'Amsterdam Concreet', price: 10.00 },
    { id: 15, name: 'Watercolours for Friends', price: 8.00 },
    { id: 16, name: 'Postcards from Old Sounds', price: 7.00 },
    { id: 17, name: 'Sakura', price: 8.00 },
    { id: 18, name: 'Poem for a Homeworld', price: 16.00 },
    { id: 19, name: 'Rhombus', price: 11.00 },
    { id: 20, name: 'Discography', price: 100.00 },
    { id: 21, name: 'Natura - Cassette', price: 12.00 }
  ]);

  const [cartItems, setCartItems] = useState([]);

  const onAddToCart = (product) => {
    const exist = cartItems.find(x => x.id === product.id);
    if (exist) {
      setCartItems(cartItems.map(x => x.id === product.id ? { ...exist, quantity: exist.quantity + 1 } : x));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const onRemoveFromCart = (id) => {
    const exist = cartItems.find(x => x.id === id);
    if (exist.quantity === 1) {
      setCartItems(cartItems.filter(x => x.id !== id));
    } else {
      setCartItems(cartItems.map(x => x.id === id ? { ...exist, quantity: exist.quantity - 1 } : x));
    }
  };

  return (
    <div className="shopPage">
      <div className="shopTitle">Shop</div>
      <div className="shopContent">
        <div className="shopContainer">
          <ProductList products={products} onAddToCart={onAddToCart} />
          <Cart cartItems={cartItems} onRemoveFromCart={onRemoveFromCart} />
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
