import React from 'react';
import ProductItem from './ProductItem';

const ProductList = ({ products, onAddToCart, onDecreaseInCart}) => (
  <div className='product-list'>
    {products.map((product) => (
      <ProductItem 
        key={product.id} 
        product={product} 
        onAddToCart={onAddToCart} 
        onDecreaseInCart={onDecreaseInCart} />
    ))}
  </div>
);

export default ProductList;