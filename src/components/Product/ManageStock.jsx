import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import axios from 'axios';

const ManageStock = () => {
    const [products, setProducts] = useState([]);
    const [errors, setErrors] = useState('');

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/products')
            .then(response => setProducts(response.data))
            .catch(error => setErrors('Error fetching products:', error));
    }, []);

    const handleRestock = (productId) => {
        // Logic for restocking a product
    };

    if (errors) {
        return <div>{errors}</div>;
    }

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Product Name</th>
                    <th>Stock</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {products.map(product => (
                    <tr key={product.id}>
                        <td>{product.name}</td>
                        <td>{product.stock}</td>
                        <td>
                            <Button variant="primary" onClick={() => handleRestock(product.id)}>Restock</Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default ManageStock;