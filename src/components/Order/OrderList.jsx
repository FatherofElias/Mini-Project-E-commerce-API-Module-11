import React, { useEffect, useState } from 'react';
import { ListGroup, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

const OrderList = ({ customerId, onOrderSelect }) => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        if (customerId) {
            axios.get(`http://127.0.0.1:5000/customers/${customerId}/orders`)
                .then(response => setOrders(response.data))
                .catch(error => {
                    console.error('Error fetching orders:', error);
                    setError('Failed to fetch orders.');
                });
        }
    }, [customerId]);

    return (
        <div>
            <h3>Orders</h3>
            {error && <Alert variant="danger">{error}</Alert>}
            <ListGroup>
                {orders.map(order => (
                    <ListGroup.Item key={order.id}>
                        <p>Order ID: {order.id}</p>
                        <p>Date: {order.date}</p>
                        <p>Products: {order.products.map(product => product.name).join(', ')}</p>
                        <Button variant="primary" onClick={() => onOrderSelect(order.id)}>Select Order</Button>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
};

export default OrderList;