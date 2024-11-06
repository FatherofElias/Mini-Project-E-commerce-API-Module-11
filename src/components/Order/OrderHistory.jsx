import React, { useEffect, useState } from 'react';
import { ListGroup, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import OrderTotalPrice from './OrderTotalPrice';

const OrderHistory = ({ customerId }) => {
    const [orders, setOrders] = useState([]);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        if (customerId) {
            axios.get(`http://127.0.0.1:5000/customers/${customerId}/orders`)
                .then(response => setOrders(response.data))
                .catch(error => {
                    console.error('Error fetching order history:', error);
                    setError('Failed to fetch order history.');
                });
        }
    }, [customerId]);

    const handleOrderSelect = (orderId) => {
        setSelectedOrderId(orderId);
    };

    return (
        <div>
            <h3>Order History</h3>
            {error && <Alert variant="danger">{error}</Alert>}
            <ListGroup>
                {orders.map(order => (
                    <ListGroup.Item key={order.id}>
                        <p>Order ID: {order.id}</p>
                        <p>Date: {order.date}</p>
                        <p>Products: {order.products.map(product => product.name).join(', ')}</p>
                        <Button variant="primary" onClick={() => handleOrderSelect(order.id)}>View Total Price</Button>
                    </ListGroup.Item>
                ))}
            </ListGroup>
            {selectedOrderId && <OrderTotalPrice orderId={selectedOrderId} />}
        </div>
    );
};

export default OrderHistory;