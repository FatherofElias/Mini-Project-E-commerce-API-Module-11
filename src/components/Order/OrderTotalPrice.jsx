import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const OrderTotalPrice = ({ orderId }) => {
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        if (orderId) {
            axios.get(`http://127.0.0.1:5000/orders/${orderId}/total`)
                .then(response => setTotalPrice(response.data.total_price))
                .catch(error => console.error('Error calculating order total:', error));
        }
    }, [orderId]);

    return (
        <div>
            <h3>Order Total Price</h3>
            <p>Total: ${totalPrice}</p>
        </div>
    );
};

OrderTotalPrice.propTypes = {
    orderId: PropTypes.number.isRequired
};

export default OrderTotalPrice;
