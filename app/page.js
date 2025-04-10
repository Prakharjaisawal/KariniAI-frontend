"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import ChatBot from "@/components/Chatbox";
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;
console.log("API URL", API_BASE);
console.log("API search", `${API_BASE}/products?search=black`);

export default function Home() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  // const [chatQuery, setChatQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${API_BASE}/products/?search=${search}`);
      const data = await res.json();
      const cleaned = data.filter((p) => p.Title && p["Variant Price"]);
      setProducts(cleaned);
    };
    fetchData();
  }, []);

  // const handleAddToCart = (product) => {
  //   setCart(prev => [...prev, product]);
  // };
  const handleAddToCart = async (product) => {
    await fetch(`${API_BASE}/cart`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    fetchCart();
  };

  const fetchCart = async () => {
    const res = await fetch(`${API_BASE}/cart/`);
    const data = await res.json();
    console.log("cart data", data);
    setCart(data);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // const handleRemoveFromCart = (sku) => {
  //   setCart(prev => prev.filter(item => item['Variant SKU'] !== sku));
  // };

  const handleRemoveFromCart = async (id) => {
    console.log("id from frontend", id);
    await fetch(`${API_BASE}/cart/${id}`, {
      method: "DELETE",
    });
    fetchCart();
  };

  const filteredProducts = (products || []).filter((p) => {
    const title = (p.Title || "").toLowerCase();
    const sku = (p["Variant SKU"] || "").toLowerCase();
    return (
      title.includes(search.toLowerCase()) || sku.includes(search.toLowerCase())
    );
  });

  return (
    <main style={styles.main}>
      {/* Header: Search Bar */}
      <div style={styles.header}>
        <h1 style={{ color: "#fff" }}>🛒 Product Catalog</h1>
        <input
          type="text"
          placeholder="Search by Title or SKU"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.searchInput}
        />
      </div>

      {/* Body: Products and Cart */}
      <div style={styles.body}>
        {/* Products */}
        <div style={styles.productList}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, idx) => (
              <ProductCard
                key={idx}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))
          ) : (
            <div style={styles.noProducts}> No Products Found</div>
          )}
        </div>

        {/* Cart */}
        <div style={styles.cart}>
          <h3 style={{ color: "#fff" }}>🧺 Cart ({cart.length})</h3>
          {cart.map((item, idx) => (
            <div key={idx} style={styles.cartItem}>
              <span>{item.product.Title}</span>
              <button onClick={() => handleRemoveFromCart(item._id)}>❌</button>
            </div>
          ))}
        </div>
        <div>
          <ChatBot
            onQueryUpdate={(productsFromChat) => {
              setProducts(
                Array.isArray(productsFromChat) ? productsFromChat : []
              );
            }}
          />
        </div>
      </div>
    </main>
  );
}

const styles = {
  main: {
    backgroundColor: "#121212",
    minHeight: "100vh",
    padding: "1rem",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    position: "sticky",
    top: 0,
    backgroundColor: "#1f1f1f",
    padding: "1rem",
    zIndex: 10,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  searchInput: {
    padding: "0.5rem",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#2c2c2c",
    color: "#fff",
    width: "250px",
  },
  body: {
    display: "flex",
    marginTop: "1rem",
    gap: "2rem",
  },
  productList: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "1rem",
    flex: 3,
    overflowY: "auto",
    maxHeight: "calc(100vh - 150px)",
    paddingRight: "1rem",
  },
  cart: {
    flex: 1,
    position: "sticky",
    top: "100px",
    backgroundColor: "#1f1f1f",
    padding: "1rem",
    borderRadius: "10px",
    color: "#fff",
    height: "fit-content",
    maxHeight: "calc(100vh - 150px)",
    overflowY: "auto",
  },
  cartItem: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "0.5rem",
    padding: "0.5rem",
    backgroundColor: "#2c2c2c",
    borderRadius: "5px",
  },
  noProducts: {
    color: '#ccc',
    textAlign: 'center',
    fontSize: '1.2rem',
    padding: '2rem',
    gridColumn: '1 / -1',
  }
  
};
