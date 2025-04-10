
import React from 'react';

const ProductCard = ({ product, onAddToCart }) => {
  const { Title, "Variant SKU": sku, "Variant Price": price, "Image Src": image } = product;

  return (
    <div style={styles.card}>
      <img src={image} alt={Title} style={styles.image} />
      <h3>{Title || "No Title"}</h3>
      <p><strong>SKU:</strong> {sku}</p>
      <p><strong>Price:</strong> ${price}</p>
      <button onClick={() => onAddToCart(product)} style={styles.button}>
        Add to Cart
      </button>
    </div>
  );
};

// const styles = {
//   card: {
//     width: '250px',
//     padding: '1rem',
//     border: '1px solid #ccc',
//     borderRadius: '10px',
//     margin: '1rem',
//     textAlign: 'center',
//     boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
//   },
//   image: {
//     width: '100%',
//     height: '200px',
//     objectFit: 'cover',
//     borderRadius: '6px',
//   },
//   button: {
//     marginTop: '10px',
//     padding: '0.5rem 1rem',
//     borderRadius: '5px',
//     background: '#0070f3',
//     color: 'white',
//     border: 'none',
//     cursor: 'pointer',
//   },
// };

const styles = {
    card: {
      backgroundColor: '#1f1f1f',
      padding: '1rem',
      borderRadius: '10px',
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
      boxShadow: '0 0 10px rgba(255,255,255,0.05)',
    },
    image: {
            width: '100%',
            height: '200px',
            objectFit: 'cover',
            borderRadius: '6px',
          },
          button: {
            marginTop: '10px',
            padding: '0.5rem 1rem',
            borderRadius: '5px',
            background: '#0070f3',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
          },
  };
  

export default ProductCard;
