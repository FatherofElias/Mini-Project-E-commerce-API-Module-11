import React, { useState, useEffect } from 'react';
import { Form, Button, Alert, Card } from 'react-bootstrap';
import axios from 'axios';

const PlaceOrderForm = ({ onOrderPlaced }) => {
    const [customerId, setCustomerId] = useState('');
    const [productIds, setProductIds] = useState([]);
    const [date, setDate] = useState('');
    const [customers, setCustomers] = useState([]);
    const [products, setProducts] = useState([]);
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState('');
    const [newOrder, setNewOrder] = useState(null);

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/customers')
            .then(response => setCustomers(response.data))
            .catch(error => console.error('Error fetching customers:', error));

        axios.get('http://127.0.0.1:5000/products')
            .then(response => setProducts(response.data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    const validate = () => {
        const newErrors = {};
        if (!customerId) newErrors.customerId = 'Customer is required';
        if (productIds.length === 0) newErrors.productIds = 'At least one product must be selected';
        if (!date) newErrors.date = 'Date is required';
        return newErrors;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            axios.post('http://127.0.0.1:5000/orders', { customer_id: customerId, product_ids: productIds, date })
                .then(response => {
                    console.log('Order placed:', response.data);
                    onOrderPlaced();
                    setNewOrder(response.data); // Store the new order data
                    setCustomerId('');
                    setProductIds([]);
                    setDate('');
                    setErrors({});
                    setSuccess('Order placed successfully!');
                })
                .catch(error => {
                    console.error('Error placing order:', error);
                });
        }
    };

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="customer">
                    <Form.Label>Customer</Form.Label>
                    <Form.Control
                        as="select"
                        value={customerId}
                        onChange={(e) => setCustomerId(e.target.value)}
                        isInvalid={!!errors.customerId}
                    >
                        <option value="">Select Customer</option>
                        {customers.map(customer => (
                            <option key={customer.id} value={customer.id}>{customer.name}</option>
                        ))}
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                        {errors.customerId}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="products" className="mt-3">
                    <Form.Label>Products</Form.Label>
                    <Form.Control
                        as="select"
                        multiple
                        value={productIds}
                        onChange={(e) => setProductIds([...e.target.selectedOptions].map(option => option.value))}
                        isInvalid={!!errors.productIds}
                    >
                        {products.map(product => (
                            <option key={product.id} value={product.id}>{product.name}</option>
                        ))}
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                        {errors.productIds}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="date" className="mt-3">
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        isInvalid={!!errors.date}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.date}
                    </Form.Control.Feedback>
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-3">
                    Place Order
                </Button>
                {success && <Alert variant="success" className="mt-3">{success}</Alert>}
            </Form>
            {newOrder && (
                <Card className="mt-4">
                    <Card.Body>
                        <Card.Title>New Order Details</Card.Title>
                        <Card.Text>Order ID: {newOrder.id}</Card.Text>
                        <Card.Text>Customer ID: {newOrder.customer_id}</Card.Text>
                        <Card.Text>Date: {newOrder.date}</Card.Text>
                        <Card.Text>
                            Products: {newOrder.product_ids ? newOrder.product_ids.join(', ') : 'No products'}
                        </Card.Text>
                    </Card.Body>
                </Card>
            )}
        </div>
    );
};

export default PlaceOrderForm;
