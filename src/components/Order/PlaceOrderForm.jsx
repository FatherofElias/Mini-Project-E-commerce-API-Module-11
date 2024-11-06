import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PlaceOrderForm = ({ onOrderPlaced }) => {
    const [customerId, setCustomerId] = useState('');
    const [productIds, setProductIds] = useState([]);
    const [date, setDate] = useState('');
    const [customers, setCustomers] = useState([]);
    const [products, setProducts] = useState([]);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/customers')
            .then(response => setCustomers(response.data))
            .catch(error => console.error('Error fetching customers:', error));

        axios.get('http://127.0.0.1:5000/products')
            .then(response => setProducts(response.data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    const validate = () => {
        const newErrors = {};
        if (!customerId) newErrors.customerId = 'Customer is required';
        if (productIds.length === 0) newErrors.productIds = 'At least one product must be selected';
        if (!date) newErrors.date = 'Date is required';
        return newErrors;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            axios.post('http://127.0.0.1:5000/orders', { customer_id: customerId, product_ids: productIds, date })
                .then(response => {
                    console.log('Order placed:', response.data);
                    onOrderPlaced();
                    setCustomerId('');
                    setProductIds([]);
                    setDate('');
                    setErrors({});
                })
                .catch(error => console.error('Error placing order:', error));
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Customer:</label>
                <select value={customerId} onChange={(e) => setCustomerId(e.target.value)}>
                    <option value="">Select Customer</option>
                    {customers.map(customer => (
                        <option key={customer.id} value={customer.id}>{customer.name}</option>
                    ))}
                </select>
                {errors.customerId && <span>{errors.customerId}</span>}
            </div>
            <div>
                <label>Products:</label>
                <select multiple value={productIds} onChange={(e) => setProductIds([...e.target.selectedOptions].map(option => option.value))}>
                    {products.map(product => (
                        <option key={product.id} value={product.id}>{product.name}</option>
                    ))}
                </select>
                {errors.productIds && <span>{errors.productIds}</span>}
            </div>
            <div>
                <label>Date:</label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                {errors.date && <span>{errors.date}</span>}
            </div>
            <button type="submit">Place Order</button>
        </form>
    );
};

export default PlaceOrderForm;
