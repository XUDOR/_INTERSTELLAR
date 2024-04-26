const ProductItem = ({ product, onAddToCart }) => {
  return (
    <div className="product-item">
      <div className="product-cover">
        <img src={`../images/ART_THUMBNAILS-CART_DISPLAY/${product.image}`} alt={product.name} />
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
