import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrderTotalPrice = ({ orderId }) => {
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        if (orderId) {
            axios.get(`http://127.0.0.1:5000/orders/${orderId}/total`)
                .then(response => setTotalPrice(response.data.total_price))
                .catch(error => console.error('Error calculating order total:', error));
        }
    }, [orderId]);

    if (!orderId) {
        return <div>Order ID is required to calculate the total price.</div>;
    }

    return (
        <div>
            <h3>Order Total Price</h3>
            <p>Total: ${totalPrice}</p>
        </div>
    );
};

export default OrderTotalPrice;