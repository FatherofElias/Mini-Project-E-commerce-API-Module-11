import React, { useState, useEffect } from 'react';
import { func, number } from 'prop-types';
import axios from 'axios';

const OrderList = ({ customerId, onOrderSelect }) => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (customerId) {
            axios.get(`http://127.0.0.1:5000/customers/${customerId}/orders`)
                .then(response => {
                    setOrders(response.data);
                })
                .catch(error => {
                    console.error('There was an error fetching the orders!', error);
                });
        }
    }, [customerId]);

    return (
        <div className="order-list">
            <h3>Orders</h3>
            <ul>
                {orders.map(order => (
                    <li key={order.id} onClick={() => onOrderSelect(order.id)}>
                        Order ID: {order.id}, Date: {order.date}
                    </li>
                ))}
            </ul>
        </div>
    );
};

OrderList.propTypes = {
    customerId: number.isRequired,
    onOrderSelect: func.isRequired
}

export default OrderList;
