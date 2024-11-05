import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CustomerDetails = ({ customerId }) => {
    const [customer, setCustomer] = useState(null);

    useEffect(() => {
        if (customerId) {
            axios.get(`http://127.0.0.1:5000/customers/${customerId}`)
                .then(response => {
                    setCustomer(response.data);
                })
                .catch(error => {
                    console.error('There was an error fetching the customer details!', error);
                });
        }
    }, [customerId]);

    const handleDelete = () => {
        axios.delete(`http://127.0.0.1:5000/customers/${customerId}`)
            .then(response => {
                console.log('Customer deleted:', response.data);
                
            })
            .catch(error => {
                console.error('There was an error deleting the customer!', error);
            });
    };

    if (!customer) return <div>Loading...</div>;

    return (
        <div className="customer-details">
            <h3>Customer Details</h3>
            <p>Name: {customer.name}</p>
            <p>Email: {customer.email}</p>
            <p>Phone: {customer.phone}</p>
            <button onClick={handleDelete}>Delete Customer</button>
        </div>
    );
};

export default CustomerDetails;