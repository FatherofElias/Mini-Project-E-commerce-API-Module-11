import React, { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import axios from 'axios';

const ProductDetails = ({ productId, onDelete }) => {
    const [product, setProduct] = useState(null);

    useEffect(() => {
        axios.get(`http://127.0.0.1:5000/products/${productId}`)
            .then(response => setProduct(response.data))
            .catch(error => console.error('Error fetching product details:', error));
    }, [productId]);

    if (!product) return <div>Loading...</div>;

    return (
        <Card>
            <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>Price: ${product.price}</Card.Text>
                <Card.Text>Stock: {product.stock}</Card.Text>
                <Button variant="danger" onClick={() => onDelete(product.id)}>Delete Product</Button>
            </Card.Body>
        </Card>
    );
};

export default ProductDetails;