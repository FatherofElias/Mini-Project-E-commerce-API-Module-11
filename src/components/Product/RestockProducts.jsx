import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

const RestockProducts = () => {
    const [productId, setProductId] = useState('');
    const [amount, setAmount] = useState('');
    const [products, setProducts] = useState([]);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/products')
            .then(response => setProducts(response.data))
            .catch(error => {
                console.error('Error fetching products:', error);
                setError('Failed to fetch products.');
            });
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(`http://127.0.0.1:5000/products/restock`, { amount: parseInt(amount) })
            .then(response => {
                console.log('Product restocked:', response.data);
                setSuccess('Product restocked successfully!');
                setError('');
                setProductId('');
                setAmount('');
            })
            .catch(error => {
                console.error('Error restocking product:', error);
                setError('Failed to restock product.');
                setSuccess('');
            });
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="product">
                <Form.Label>Product</Form.Label>
                <Form.Control
                    as="select"
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                >
                    <option value="">Select Product</option>
                    {products.map(product => (
                        <option key={product.id} value={product.id}>{product.name}</option>
                    ))}
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="amount" className="mt-3">
                <Form.Label>Amount</Form.Label>
                <Form.Control
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
                Restock Product
            </Button>
            {success && <Alert variant="success" className="mt-3">{success}</Alert>}
            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
        </Form>
    );
};

export default RestockProducts;