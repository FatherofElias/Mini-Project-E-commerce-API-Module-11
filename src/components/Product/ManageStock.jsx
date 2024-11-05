import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ManageStock = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const updateStock = (productId, newStock) => {
    axios.put(`http://127.0.0.1:5000/products/${productId}/stock`, { stock: newStock })
      .then(response => {
        setProducts(products.map(product =>
          product.id === productId ? { ...product, stock: newStock } : product
        ));
      })
      .catch(error => console.error('Error updating stock:', error));
  };

  return (
    <div>
      <h1>Manage Stock Levels</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.name} - Stock: {product.stock}
            <button onClick={() => updateStock(product.id, product.stock + 1)}>Increase</button>
            <button onClick={() => updateStock(product.id, product.stock - 1)}>Decrease</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageStock;
