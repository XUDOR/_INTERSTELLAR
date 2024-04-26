const ProductItem = ({ product, onAddToCart }) => {
  return (
    <div className="product-item">
      <div className="product-cover">
        {/* Make sure the path is correct. The product.image should be a path relative to the public directory. */}
        <img src={`/images/${product.image}`} alt={product.name} />
      </div>
      <div className="product-details">
        <h3 className="product-name">{product.name}</h3>
        <div className="product-catalogue">{product.catalogueID}</div>
        <p className="product-price">${product.price.toFixed(2)}</p>
        <button className="add-to-cart" onClick={() => onAddToCart(product)}>+</button>
      </div>
    </div>
  );
};

export default ProductItem;
