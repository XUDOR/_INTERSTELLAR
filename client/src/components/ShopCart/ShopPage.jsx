import React, { useState } from 'react';
import Cart from './Cart';
import ProductList from './ProductList';
import './ShopPage.css';

// Define products as a constant if they do not need to change
const products = [
    { id: 1, name: 'Charlotta', price: 9.00, catalogueID: '#00040101', image: '/images/ART_THUMBNAILS-CART_DISPLAY/1_CHARLOTTA_thumb.png' },
    { id: 2, name: 'Objects & Particles', price: 7.00, catalogueID: '#00040102', image: '/images/ART_THUMBNAILS-CART_DISPLAY/2_OBJECTS-PARTICLES_thumb.png' },
    { id: 3, name: 'Glass City of Us', price: 7.00, catalogueID: '#00040103', image: '/images/ART_THUMBNAILS-CART_DISPLAY/3_GLASS-CITY-OF-US_thumb.png' },
    { id: 4, name: 'New Domes of Earth', price: 7.00, catalogueID: '#00040104', image: '/images/ART_THUMBNAILS-CART_DISPLAY/4_NEW-DOMES_thumb.png' },
    { id: 5, name: 'Natura', price: 10.00, catalogueID: '#01040105 /digital', image: '/images/ART_THUMBNAILS-CART_DISPLAY/5_NATURA_thumb.png' },
    { id: 6, name: 'Outer Corners', price: 8.00, catalogueID: '#01040106', image: '/images/ART_THUMBNAILS-CART_DISPLAY/6_OUTER-CORNERS_thumb.png' },
    { id: 7, name: 'Nonagon', price: 10.00, catalogueID: '#01040107', image: '/images/ART_THUMBNAILS-CART_DISPLAY/7_NONAGON_thumb.png' },
    { id: 8, name: 'Ambient Garden One', price: 15.00, catalogueID: '#01040108', image: '/images/ART_THUMBNAILS-CART_DISPLAY/8_AMBIENTGARDENONE_thumb.png' },
    { id: 9, name: 'Music for Seven Structures', price: 8.00, catalogueID: '#01040109', image: '/images/ART_THUMBNAILS-CART_DISPLAY/9_7STRUCTURES_thumb.png' },
    { id: 10, name: 'Inner Moments of Light', price: 10.00, catalogueID: '#01040110', image: '/images/ART_THUMBNAILS-CART_DISPLAY/10_INNER-MOMENTS_thumb.png' },
    { id: 11, name: 'Nocturnes & Reveries', price: 16.00, catalogueID: '#01040111', image: '/images/ART_THUMBNAILS-CART_DISPLAY/11_NOCTURNES-REVERIES_thumb.png' },
    { id: 12, name: 'Prefabrication', price: 11.00, catalogueID: '#01040112', image: '/images/ART_THUMBNAILS-CART_DISPLAY/12_PREFABRICATION_thumb.png' },
    { id: 13, name: 'Vagary', price: 9.00, catalogueID: '#01040113', image: '/images/ART_THUMBNAILS-CART_DISPLAY/13_VAGARY_thumb.png' },
    { id: 14, name: 'Amsterdam Concreet', price: 10.00, catalogueID: '#01040114', image: '/images/ART_THUMBNAILS-CART_DISPLAY/14_AMSTERDAM-CONCREET_thumb.png' },
    { id: 15, name: 'Watercolours for Friends', price: 8.00, catalogueID: '#01040115', image: '/images/ART_THUMBNAILS-CART_DISPLAY/15_WATERCOLOURS_thumb.png' },
    { id: 16, name: 'Postcards from Old Sounds', price: 7.00, catalogueID: '#01040116', image: '/images/ART_THUMBNAILS-CART_DISPLAY/16_POSTACARDS-OLD-SOUNDS_thumb.png' },
    { id: 17, name: 'Sakura', price: 8.00, catalogueID: '#01040117', image: '/images/ART_THUMBNAILS-CART_DISPLAY/17_SAKURA_thumb.png' },
    { id: 18, name: 'Poem for a Homeworld', price: 16.00, catalogueID: '#01040118', image: '/images/ART_THUMBNAILS-CART_DISPLAY/18_POEM-HOMEWORLD_thumb.png' },
    { id: 19, name: 'Rhombus', price: 11.00, catalogueID: '#01040119', image: '/images/ART_THUMBNAILS-CART_DISPLAY/19_RHOMBUS_thumb.png' },
    { id: 20, name: 'Natura - Cassette', price: 12.00, catalogueID: '#01020105 /cassette', image: '/images/ART_THUMBNAILS-CART_DISPLAY/5_NATURA_thumb.png' },
    { id: 21, name: 'Discography', price: 100.00, catalogueID: '#010401A', image: '/images/ART_THUMBNAILS-CART_DISPLAY/A_Discography_thumb.png' }
];

const ShopPage = () => {
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
      <div className="shopContent">
        <div className="shopContainer">
          <ProductList products={products} onAddToCart={onAddToCart} />
        </div>
        <Cart cartItems={cartItems} onRemoveFromCart={onRemoveFromCart} />
      </div>
    </div>
  );
};

export default ShopPage;
