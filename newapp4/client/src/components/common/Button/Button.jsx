import React from 'react';
import './Button.css';

const Button = ({ children, onClick, type = 'button', variant = 'primary', disabled = false, loading = false, className = '' }) => {
  return (
    <button
      type={type}
      className={`btn btn--${variant} ${className} ${loading ? 'btn--loading' : ''}`}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? 'Loading...' : children}
    </button>
  );
};

export default Button;