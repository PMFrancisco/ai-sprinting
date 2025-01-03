import React from 'react';
import './Button.css';

function Button({ children, ...props }) {
  return (
    <button {...props} className="custom-button">
      {children}
    </button>
  );
}

export default Button;