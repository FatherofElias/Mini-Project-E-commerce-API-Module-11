import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PlaceOrderForm = ({ onOrderPlaced }) => {
    const [customerId, setCustomerId] = useState('');
    const [productIds, setProductIds] = useState([]);
    const [date, setDate] = useState('');
    const [customers, setCustomers] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/customers')
            .then(response => setCustomers(response.data))
            .catch(error => console.error('Error fetching customers:', error));

        axios.get('http://127.0.0.1:5000/products')
            .then(response => setProducts(response.data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://127.0.0.1:5000/orders', { customer_id: customerId, product_ids: productIds, date })
            .then(response => {
                console.log('Order placed:', response.data);
                onOrderPlaced();
                setCustomerId('');
                setProductIds([]);
                setDate('');
            })
            .catch(error => console.error('Error placing order:', error));
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
            </div>
            <div>
                <label>Products:</label>
                <select multiple value={productIds} onChange={(e) => setProductIds([...e.target.selectedOptions].map(option => option.value))}>
                    {products.map(product => (
                        <option key={product.id} value={product.id}>{product.name}</option>
                    ))}
                </select>
            </div>
            <div>
                <label>Date:</label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <button type="submit">Place Order</button>
        </form>
    );
};

export default PlaceOrderForm;