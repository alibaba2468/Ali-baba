import React from 'react';
import './ProductCard.css';

function ProductCard({ product, onAddToCart, isAuthenticated }) {
  const handleAddToCart = () => {
    if (isAuthenticated) {
      onAddToCart(product);
    } else {
      alert('Please login first');
    }
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image || '📦'} alt={product.name} />
      </div>
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-meta">
          <span className="price">π {product.price}</span>
          <span className="stock">Stock: {product.stock}</span>
        </div>
        <button 
          className="btn-add-cart"
          onClick={handleAddToCart}
          disabled={product.stock === 0}
        >
          {product.stock > 0 ? '🛒 Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
