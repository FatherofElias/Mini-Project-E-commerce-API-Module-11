import React, { useEffect, useState } from 'react';
import { ListGroup, Button, Alert, Card } from 'react-bootstrap';
import axios from 'axios';

const OrderList = ({ customerId }) => {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        if (customerId) {
            axios.get(`http://127.0.0.1:5000/customers/${customerId}/orders`)
                .then(response => {
                    console.log('Fetched orders:', response.data); // Log the fetched orders
                    setOrders(response.data);
                })
                .catch(error => {
                    console.error('Error fetching orders:', error);
                    setError('Failed to fetch orders.');
                });
        }
    }, [customerId]);

    const handleOrderSelect = (order) => {
        console.log('Selected order:', order); // Log the selected order
        setSelectedOrder(order);
    };

    return (
        <div>
            <h3>Orders</h3>
            {error && <Alert variant="danger">{error}</Alert>}
            <ListGroup>
                {orders.map(order => (
                    <ListGroup.Item key={order.id}>
                        <div>
                            <p>Order ID: {order.id}</p>
                            <p>Date: {order.date}</p>
                            <p>Products: {order.products.map(product => product.name).join(', ')}</p>
                        </div>
                        <Button
                            variant="primary"
                            onClick={() => handleOrderSelect(order)}
                        >
                            Select Order
                        </Button>
                    </ListGroup.Item>
                ))}
            </ListGroup>
            {selectedOrder && (
                <Card className="mt-4">
                    <Card.Body>
                        <Card.Title>Selected Order Details</Card.Title>
                        <Card.Text>Order ID: {selectedOrder.id}</Card.Text>
                        <Card.Text>Date: {selectedOrder.date}</Card.Text>
                        <Card.Text>Products: {selectedOrder.products.map(product => product.name).join(', ')}</Card.Text>
                    </Card.Body>
                </Card>
            )}
        </div>
    );
};

export default OrderList;