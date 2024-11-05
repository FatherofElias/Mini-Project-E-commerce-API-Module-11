import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UpdateProduct = ({ productId }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');

  useEffect(() => {
    axios.get(`http://127.0.0.1:5000/products/${productId}`)
      .then(response => {
        setName(response.data.name);
        setPrice(response.data.price);
        setStock(response.data.stock);
      })
      .catch(error => console.error('Error fetching product details:', error));
  }, [productId]);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put(`http://127.0.0.1:5000/products/${productId}`, { name, price, stock })
      .then(response => console.log('Product updated:', response.data))
      .catch(error => console.error('Error updating product:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Product Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label>Price:</label>
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
      </div>
      <div>
        <label>Stock:</label>
        <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} />
      </div>
      <button type="submit">Update Product</button>
    </form>
  );
};

export default UpdateProduct;