import React from 'react';
import { ListGroup, Button, Badge } from 'react-bootstrap';

const ListProducts = ({ products, onDeleteProduct, onRestockProduct }) => {
    return (
        <ListGroup>
            {products.map(product => (
                <ListGroup.Item key={product.id}>
                    <div>
                        <p>Product Name: {product.name}</p>
                        <p>Price: ${product.price}</p>
                        <p>Stock: <Badge bg="info">{product.stock}</Badge></p>
                    </div>
                    <Button variant="danger" onClick={() => onDeleteProduct(product.id)} className="me-2">Delete</Button>
                    <Button variant="warning" onClick={() => onRestockProduct(product.id)}>Restock</Button>
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
};

export default ListProducts;