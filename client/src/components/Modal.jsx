import React from 'react';
import './Modal.css';

const Modal = ({ children }) => {
  return (
    <div className="modal-overlay">
        {children}
    </div>
  );
};

export default Modal;