import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

const AddProduct = ({ onProductAdded }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState(0);
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState('');

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
                    onProductAdded();  // Invoke the callback
                    setName('');
                    setPrice('');
                    setStock(0);
                    setErrors({});
                    setSuccess('Product added successfully!');
                })
                .catch(error => {
                    console.error('Error adding product:', error);
                    setSuccess('');
                });
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name">
                <Form.Label>Product Name</Form.Label>
                <Form.Control 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    isInvalid={!!errors.name} 
                />
                <Form.Control.Feedback type="invalid">
                    {errors.name}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="price" className="mt-3">
                <Form.Label>Price</Form.Label>
                <Form.Control 
                    type="number" 
                    value={price} 
                    onChange={(e) => setPrice(e.target.value)} 
                    isInvalid={!!errors.price} 
                />
                <Form.Control.Feedback type="invalid">
                    {errors.price}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="stock" className="mt-3">
                <Form.Label>Stock</Form.Label>
                <Form.Control 
                    type="number" 
                    value={stock} 
                    onChange={(e) => setStock(e.target.value)} 
                    isInvalid={!!errors.stock} 
                />
                <Form.Control.Feedback type="invalid">
                    {errors.stock}
                </Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
                Add Product
            </Button>
            {success && <Alert variant="success" className="mt-3">{success}</Alert>}
        </Form>
    );
};

export default AddProduct;
