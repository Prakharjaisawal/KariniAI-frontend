// components/Cart.jsx
import React from 'react';

const Cart = ({ cartItems, onRemove }) => {
  return (
    <div style={styles.cartContainer}>
      <h2>🧺 Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cartItems.map((item, index) => (
          <div key={index} style={styles.cartItem}>
            <div>
              <strong>{item.Title}</strong>
              <p>SKU: {item["Variant SKU"]}</p>
              <p>Price: ${item["Variant Price"]}</p>
            </div>
            <button style={styles.removeButton} onClick={() => onRemove(index)}>
              ❌ Remove
            </button>
          </div>
        ))
      )}
    </div>
  );
};

const styles = {
  cartContainer: {
    border: '1px solid #ccc',
    padding: '1rem',
    marginTop: '2rem',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
  },
  cartItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
    padding: '0.5rem',
    borderBottom: '1px solid #ddd',
  },
  removeButton: {
    padding: '5px 10px',
    fontSize: '14px',
    backgroundColor: '#ff4d4f',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default Cart;
