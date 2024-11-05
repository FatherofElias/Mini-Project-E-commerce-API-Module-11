import React, { useState } from 'react';
import axios from 'axios';


const AddProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://127.0.0.1:5000/products', { name, price, stock })
      .then(response => console.log('Product created:', response.data))
      .catch(error => console.error('Error creating product:', error));
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
      <button type="submit">Create Product</button>
    </form>
  );
};

export default AddProduct;
