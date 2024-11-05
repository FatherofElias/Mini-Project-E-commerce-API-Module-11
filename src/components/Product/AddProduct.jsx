import React, { useState } from 'react';
import axios from 'axios';

const AddProduct = ({ onProductAdded }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState(0);
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!name) newErrors.name = 'Product name is required';
        if (!price) newErrors.price = 'Price is required';
        if (!stock) newErrors.stock = 'Stock quantity is required';
        return newErrors;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            axios.post('http://127.0.0.1:5000/products', { name, price, stock })
                .then(response => {
                    console.log('Product added:', response.data);
                    onProductAdded();
                    setName('');
                    setPrice('');
                    setStock(0);
                    setErrors({});
                })
                .catch(error => {
                    console.error('Error adding product:', error);
                });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Product Name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                {errors.name && <span>{errors.name}</span>}
            </div>
            <div>
                <label>Price:</label>
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                {errors.price && <span>{errors.price}</span>}
            </div>
            <div>
                <label>Stock:</label>
                <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} />
                {errors.stock && <span>{errors.stock}</span>}
            </div>
            <button type="submit">Add Product</button>
        </form>
    );
};

export default AddProduct;

