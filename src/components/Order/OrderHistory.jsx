import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OrderTotalPrice from './OrderTotalPrice';

const OrderHistory = ({ customerId }) => {
    const [orders, setOrders] = useState([]);
    const [selectedOrderId, setSelectedOrderId] = useState(null);

    useEffect(() => {
        if (customerId) {
            axios.get(`http://127.0.0.1:5000/customers/${customerId}/orders`)
                .then(response => setOrders(response.data))
                .catch(error => console.error('Error fetching order history:', error));
        }
    }, [customerId]);

    const handleOrderSelect = (orderId) => {
        setSelectedOrderId(orderId);
    };

    return (
        <div>
            <h3>Order History</h3>
            <ul>
                {orders.map(order => (
                    <li key={order.id}>
                        <p>Order ID: {order.id}</p>
                        <p>Date: {order.date}</p>
                        <p>Products: {order.products.map(product => product.name).join(', ')}</p>
                        <button onClick={() => handleOrderSelect(order.id)}>View Total Price</button>
                    </li>
                ))}
            </ul>
            {selectedOrderId && <OrderTotalPrice orderId={selectedOrderId} />}
        </div>
    );
};

export default OrderHistory;
