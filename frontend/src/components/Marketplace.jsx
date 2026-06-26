import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import './Marketplace.css';

function Marketplace({ isAuthenticated, onAddToCart }) {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Premium Pi Merchandise',
      description: 'Exclusive ALI BABA branded merchandise',
      price: 10,
      stock: 50,
      image: '👕'
    },
    {
      id: 2,
      name: 'Digital Course',
      description: 'Learn Pi Network development basics',
      price: 25,
      stock: 100,
      image: '📚'
    },
    {
      id: 3,
      name: 'Pi Network Guide',
      description: 'Complete beginner\'s guide to Pi',
      price: 15,
      stock: 75,
      image: '📖'
    },
    {
      id: 4,
      name: 'Premium Support',
      description: '1 month of priority support',
      price: 50,
      stock: 20,
      image: '🎯'
    },
    {
      id: 5,
      name: 'Developer Kit',
      description: 'Complete dApp development toolkit',
      price: 100,
      stock: 10,
      image: '🛠️'
    },
    {
      id: 6,
      name: 'Consulting Session',
      description: '1-hour one-on-one consultation',
      price: 75,
      stock: 15,
      image: '💼'
    }
  ]);

  const [loading, setLoading] = useState(false);

  return (
    <main className="marketplace">
      <div className="container">
        <section className="hero">
          <h1>Welcome to ALI BABA Marketplace</h1>
          <p>Discover amazing products and services powered by Pi Network</p>
          {!isAuthenticated && (
            <p className="login-prompt">👈 Login with Pi to start shopping</p>
          )}
        </section>

        <section className="products-section">
          <h2>Featured Products</h2>
          <div className="products-grid">
            {products.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                isAuthenticated={isAuthenticated}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

export default Marketplace;
