import React, { useState } from 'react';
import axios from 'axios';

const CustomerForm = ({ onCustomerAdded }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('/customers', { name, email, phone })
            .then(response => {
                console.log('Customer added:', response.data);
                onCustomerAdded();
                setName('');
                setEmail('');
                setPhone('');
            })
            .catch(error => {
                console.error('Error adding customer:', error);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
                <label>Phone:</label>
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <button type="submit">Add Customer</button>
        </form>
    );
};

export default CustomerForm;