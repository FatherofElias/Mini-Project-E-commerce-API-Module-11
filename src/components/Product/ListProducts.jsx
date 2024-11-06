import React, { useEffect, useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import axios from 'axios';

const ListProducts = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/products')
            .then(response => setProducts(response.data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    return (
        <ListGroup>
            {products.map(product => (
                <ListGroup.Item key={product.id}>
                    {product.name} - ${product.price}
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
};

export default ListProducts;