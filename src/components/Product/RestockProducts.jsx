import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RestockProducts = ({ threshold }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  useEffect(() => {
    products.forEach(product => {
      if (product.stock < threshold) {
        console.log(`Restocking ${product.name}`);
        axios.put(`http://127.0.0.1:5000/products/${product.id}/stock`, { stock: threshold })
          .then(response => {
            setProducts(products.map(p =>
              p.id === product.id ? { ...p, stock: threshold } : p
            ));
          })
          .catch(error => console.error('Error restocking product:', error));
      }
    });
  }, [products, threshold]);

  return (
    <div>
      <h1>Restock Products</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.name} - Stock: {product.stock}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RestockProducts;