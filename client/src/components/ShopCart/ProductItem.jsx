import React from "react";

const ProductItem = ({ product, onAddToCart }) => {
  // Replace spaces with dashes and append '_thumb.png' to form the filename
  const imageName = `${product.id}_${product.name.toUpperCase().replace(/ /g, '-')}_thumb.png`;

  return (
    <div className="product-item">
      <div className="product-cover">
        <img src={`../images/ART_THUMBNAILS-CART_DISPLAY/${imageName}`} alt={product.name} />
      </div>
      <div className="product-details">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">${product.price.toFixed(2)}</p>
        <button className="add-product" onClick={() => onAddToCart(product)}>+</button>
      </div>
    </div>
  );
};

export default ProductItem;
