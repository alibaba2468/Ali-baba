import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header({ user, isAuthenticated, onLogin, onLogout, cartCount }) {
  return (
    <header className="header">
      <div className="container header-container">
        <div className="logo">
          <Link to="/">
            <h1>🏪 ALI BABA</h1>
            <p>Pi Network Marketplace</p>
          </Link>
        </div>

        <nav className="nav">
          <Link to="/" className="nav-link">Marketplace</Link>
          {isAuthenticated && (
            <>
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
              <Link to="/checkout" className="nav-link cart-link">
                🛒 Cart ({cartCount})
              </Link>
            </>
          )}
        </nav>

        <div className="auth-section">
          {isAuthenticated ? (
            <div className="user-info">
              <span className="user-name">👤 {user?.username || 'User'}</span>
              <button className="btn-logout" onClick={onLogout}>
                Logout
              </button>
            </div>
          ) : (
            <button className="btn-login" onClick={onLogin}>
              🔐 Login with Pi
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
