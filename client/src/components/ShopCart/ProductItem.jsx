const ProductItem = ({ product, onAddToCart }) => {
  return (
    <div className="product-item">
      <div className="product-cover">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-info-container">
      <div className="product-details">
        <h3 className="product-name">{product.name}</h3>
        <div className="product-catalogue">{product.catalogueID}</div>
      </div>
      <div className="price-addCart">
      <p className="product-price">${product.price.toFixed(2)}</p>
      <button className="add-to-cart" onClick={() => onAddToCart(product)}>+</button>
      </div>

      </div>
    </div>
  );
};

export default ProductItem;
