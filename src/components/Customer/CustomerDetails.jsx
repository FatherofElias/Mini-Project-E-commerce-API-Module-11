import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import axios from 'axios';

const CustomerDetails = ({ customerId }) => {
    const [customer, setCustomer] = useState(null);

    useEffect(() => {
        axios.get(`http://127.0.0.1:5000/customers/${customerId}`)
            .then(response => setCustomer(response.data))
            .catch(error => console.error('Error fetching customer details:', error));
    }, [customerId]);

    if (!customer) return <div>Loading...</div>;

    return (
        <Card>
            <Card.Body>
                <Card.Title>{customer.name}</Card.Title>
                <Card.Text>Email: {customer.email}</Card.Text>
                <Card.Text>Phone: {customer.phone}</Card.Text>
            </Card.Body>
        </Card>
    );
};

export default CustomerDetails;