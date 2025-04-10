// components/SearchBar.js
import React from 'react';

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <input
      type="text"
      placeholder="Search by Title or SKU"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      style={{
        padding: '10px',
        width: '100%',
        marginBottom: '20px',
        fontSize: '16px',
      }}
    />
  );
};

export default SearchBar;
