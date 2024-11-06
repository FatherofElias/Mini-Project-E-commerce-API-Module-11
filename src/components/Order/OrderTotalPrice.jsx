import React, { useEffect, useState } from 'react';
import { Card, Alert } from 'react-bootstrap';
import axios from 'axios';
import PropTypes from 'prop-types';

const OrderTotalPrice = ({ orderId }) => {
    const [totalPrice, setTotalPrice] = useState(0);
    const [error, setError] = useState('');

    useEffect(() => {
        if (orderId) {
            axios.get(`http://127.0.0.1:5000/orders/${orderId}/total`)
                .then(response => {
                    setTotalPrice(response.data.total_price);
                    setError('');
                })
                .catch(error => {
                    console.error('Error calculating order total:', error);
                    setError('Failed to calculate order total.');
                });
        }
    }, [orderId]);

    return (
        <Card>
            <Card.Body>
                <Card.Title>Order Total Price</Card.Title>
                {error ? (
                    <Alert variant="danger">{error}</Alert>
                ) : (
                    <Card.Text>Total: ${totalPrice}</Card.Text>
                )}
            </Card.Body>
        </Card>
    );
};

OrderTotalPrice.propTypes = {
    orderId: PropTypes.number.isRequired,
};

export default OrderTotalPrice;