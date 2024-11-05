import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrderHistory = ({ customerId }) => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (customerId) {
            axios.get(`http://127.0.0.1:5000/customers/${customerId}/orders`)
                .then(response => setOrders(response.data))
                .catch(error => console.error('Error fetching order history:', error));
        }
    }, [customerId]);



const handleCancel = (orderId) => {
    axios.put(`http://127.0.0.1:5000/orders/${orderId}/cancel`)
        .then(response => {
            console.log('Order canceled:', response.data);
            setOrders(orders.map(order =>
                order.id === orderId ? { ...order, status: 'canceled' } : order
            ));
        })
        .catch(error => console.error('Error canceling order:', error));
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
                    </li>
                ))}
            </ul>
            <button onClick={() => handleCancel(order.id)}>Cancel Order</button>
        </div>
    );
};

export default OrderHistory;
