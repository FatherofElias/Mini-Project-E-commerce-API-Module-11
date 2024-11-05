import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductDetails = ({ productId, onDelete }) => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`http://127.0.0.1:5000/products/${productId}`)
      .then(response => setProduct(response.data))
      .catch(error => console.error('Error fetching product details:', error));
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleDelete = () => {
    onDelete(productId);
  };

  return (
    <div>
      <h1>{product.name}</h1>
      <p>Price: ${product.price}</p>
      <p>Stock: {product.stock}</p>
      <button onClick={handleDelete}>Delete Product</button>
    </div>
  );
};

export default ProductDetails;