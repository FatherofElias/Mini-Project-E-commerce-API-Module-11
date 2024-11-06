import React, { useEffect, useState } from 'react';
import { Table, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

const RestockProducts = () => {
    const [products, setProducts] = useState([]);
    const [errors, setErrors] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/products')
            .then(response => setProducts(response.data))
            .catch(error => setErrors('Error fetching products:', error));
    }, []);

    const handleRestock = (productId) => {
        axios.post(`http://127.0.0.1:5000/products/${productId}/restock`)
            .then(response => {
                setSuccess('Product restocked successfully!');
                setProducts(products.map(product => 
                    product.id === productId ? { ...product, stock: response.data.stock } : product
                ));
            })
            .catch(error => setErrors('Error restocking product:', error));
    };

    return (
        <>
            {errors && <Alert variant="danger">{errors}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
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
        </>
    );
};

export default RestockProducts;