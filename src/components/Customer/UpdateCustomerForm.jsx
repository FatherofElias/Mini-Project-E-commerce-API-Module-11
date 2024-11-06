import React, { useEffect, useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

const UpdateCustomerForm = ({ customerId }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState('');

    useEffect(() => {
        axios.get(`http://127.0.0.1:5000/customers/${customerId}`)
            .then(response => {
                setName(response.data.name);
                setEmail(response.data.email);
                setPhone(response.data.phone);
            })
            .catch(error => console.error('Error fetching customer details:', error));
    }, [customerId]);

    const validate = () => {
        const newErrors = {};
        if (!name) newErrors.name = 'Name is required';
        if (!email) newErrors.email = 'Email is required';
        if (!phone) newErrors.phone = 'Phone number is required';
        return newErrors;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            axios.put(`http://127.0.0.1:5000/customers/${customerId}`, { name, email, phone })
                .then(response => {
                    console.log('Customer updated:', response.data);
                    setSuccess('Customer updated successfully!');
                    setErrors({});
                })
                .catch(error => {
                    console.error('Error updating customer:', error);
                });
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    isInvalid={!!errors.name}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.name}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="email" className="mt-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.email}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="phone" className="mt-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    isInvalid={!!errors.phone}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.phone}
                </Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
                Update Customer
            </Button>
            {success && <Alert variant="success" className="mt-3">{success}</Alert>}
        </Form>
    );
};

export default UpdateCustomerForm;