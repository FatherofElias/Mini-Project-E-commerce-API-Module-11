import React, { useEffect, useState } from 'react';
import { ListGroup, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import OrderTotalPrice from './OrderTotalPrice';

const OrderHistory = ({ customerId }) => {
    const [orders, setOrders] = useState([]);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

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

    const handleCancelOrder = (orderId) => {
        axios.delete(`http://127.0.0.1:5000/orders/${orderId}`)
            .then(response => {
                console.log('Order canceled:', response.data);
                setOrders(orders.filter(order => order.id !== orderId));
                setSuccess('Order canceled successfully!');
            })
            .catch(error => {
                console.error('Error canceling order:', error);
                setError('Failed to cancel order.');
            });
    };

    return (
        <div>
            <h3>Order History</h3>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            <ListGroup>
                {orders.map(order => (
                    <ListGroup.Item key={order.id}>
                        <div>
                            <p>Order ID: {order.id}</p>
                            <p>Date: {order.date}</p>
                            <p>Products: {order.products.map(product => product.name).join(', ')}</p>
                        </div>
                        <div>
                            <Button variant="primary" onClick={() => handleOrderSelect(order.id)}>View Total Price</Button>
                            <Button
                                variant="danger"
                                onClick={() => handleCancelOrder(order.id)}
                                className="ms-2"
                                disabled={order.status === 'shipped' || order.status === 'completed'}
                            >
                                Cancel Order
                            </Button>
                        </div>
                    </ListGroup.Item>
                ))}
            </ListGroup>
            {selectedOrderId && <OrderTotalPrice orderId={selectedOrderId} />}
        </div>
    );
};

export default OrderHistory;