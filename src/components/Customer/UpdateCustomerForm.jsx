import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateCustomerForm = ({ customerId }) => {
    const [customer, setCustomer] = useState({ name: '', email: '', phone: '' });

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

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCustomer({ ...customer, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put(`http://127.0.0.1:5000/customers/${customerId}`, customer)
            .then(response => {
                console.log('Customer updated:', response.data);
                // Optionally, call a parent component method to refresh the customer list
            })
            .catch(error => {
                console.error('There was an error updating the customer!', error);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Update Customer</h3>
            <label>
                Name:
                <input type="text" name="name" value={customer.name} onChange={handleChange} />
            </label>
            <br />
            <label>
                Email:
                <input type="email" name="email" value={customer.email} onChange={handleChange} />
            </label>
            <br />
            <label>
                Phone:
                <input type="tel" name="phone" value={customer.phone} onChange={handleChange} />
            </label>
            <br />
            <button type="submit">Submit</button>
        </form>
    );
};

export default UpdateCustomerForm;