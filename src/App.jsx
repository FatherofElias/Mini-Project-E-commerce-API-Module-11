import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Button, Form } from 'react-bootstrap';
import CustomerList from './components/Customer/CustomerList';
import CustomerForm from './components/Customer/CustomerForm';
import CustomerDetails from './components/Customer/CustomerDetails';
import UpdateCustomerForm from './components/Customer/UpdateCustomerForm';
import AddProduct from './components/Product/AddProduct';
import ListProducts from './components/Product/ListProducts';
import ProductDetails from './components/Product/ProductDetails';
import UpdateProduct from './components/Product/UpdateProduct';
import ConfirmationModal from './components/ConfirmationModal';
import PlaceOrderForm from './components/Order/PlaceOrderForm';
import OrderHistory from './components/Order/OrderHistory';
import OrderList from './components/Order/OrderList';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedCustomerId: null,
            selectedProductId: null,
            showModal: false,
            modalMessage: '',
            modalAction: null,
            restockProductId: null,
            restockAmount: '',
            products: [],
        };
    }

    componentDidMount() {
        this.fetchProducts();
    }

    fetchProducts = () => {
        axios.get('http://127.0.0.1:5000/products')
            .then(response => {
                this.setState({ products: response.data });
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    };

    handleCustomerSelect = (customerId) => {
        this.setState({ selectedCustomerId: customerId });
    };

    handleProductSelect = (productId) => {
        this.setState({ selectedProductId: productId });
    };

    handleModalOpen = (message, action) => {
        this.setState({ showModal: true, modalMessage: message, modalAction: action });
    };

    handleModalClose = () => {
        this.setState({ showModal: false, modalMessage: '', modalAction: null });
    };

    handleModalConfirm = () => {
        if (this.state.modalAction) {
            this.state.modalAction();
        }
        this.handleModalClose();
    };

    handleDeleteProduct = (productId) => {
        this.handleModalOpen('Are you sure you want to delete this product?', () => {
            axios.delete(`http://127.0.0.1:5000/products/${productId}`)
                .then(response => {
                    this.setState({ selectedProductId: null });
                    this.fetchProducts(); // Refresh products list
                })
                .catch(error => console.error('Error deleting product:', error));
        });
    };

    handleRestockProduct = (productId) => {
        this.setState({ restockProductId: productId });
        this.handleRestockModalOpen();
    };

    handleRestockModalOpen = () => {
        this.setState({ showModal: true, modalMessage: 'Enter the restock amount:', modalAction: this.restockProduct });
    };

    restockProduct = () => {
        const { restockProductId, restockAmount, products } = this.state;
        axios.post(`http://127.0.0.1:5000/products/restock`, { amount: parseInt(restockAmount) })
            .then(response => {
                const updatedProducts = products.map(product => {
                    if (product.id === restockProductId) {
                        return { ...product, stock: product.stock + parseInt(restockAmount) };
                    }
                    return product;
                });
                this.setState({ products: updatedProducts, restockAmount: '' });
            })
            .catch(error => {
                console.error('Error restocking product:', error);
            });
    };

    handleRestockAmountChange = (event) => {
        this.setState({ restockAmount: event.target.value });
    };

    handleCustomerAdded = () => {
        console.log('Customer added');
    };

    render() {
        const { selectedCustomerId, selectedProductId, showModal, modalMessage, restockAmount, products } = this.state;

        return (
            <Router>
                <div className="app-container">
                    <Navbar bg="dark" variant="dark" expand="lg">
                        <Container>
                            <Navbar.Brand as={Link} to="/">E-Commerce App</Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">
                                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                                    <Nav.Link as={Link} to="/customers">Customers</Nav.Link>
                                    <Nav.Link as={Link} to="/products">Products</Nav.Link>
                                    <Nav.Link as={Link} to="/orders">Orders</Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                    <Container className="mt-4">
                        <Routes>
                            <Route path="/" element={<h1>Welcome to the E-Commerce App</h1>} />
                            <Route path="/customers" element={
                                <>
                                    <CustomerForm onCustomerAdded={this.handleCustomerAdded} />
                                    <CustomerList onCustomerSelect={this.handleCustomerSelect} />
                                    {selectedCustomerId && (
                                        <>
                                            <CustomerDetails customerId={selectedCustomerId} />
                                            <UpdateCustomerForm customerId={selectedCustomerId} />
                                            <OrderList customerId={selectedCustomerId} onOrderSelect={this.handleProductSelect} />
                                        </>
                                    )}
                                </>
                            } />
                            <Route path="/products" element={
                                <>
                                    <AddProduct onProductAdded={this.handleCustomerAdded} />
                                    <ListProducts
                                        products={products}
                                        onDeleteProduct={this.handleDeleteProduct}
                                        onRestockProduct={this.handleRestockProduct}
                                    />
                                    {selectedProductId && (
                                        <>
                                            <ProductDetails productId={selectedProductId} onDelete={this.handleDeleteProduct} />
                                            <UpdateProduct productId={selectedProductId} />
                                        </>
                                    )}
                                </>
                            } />
                            <Route path="/orders" element={
                                <>
                                    <PlaceOrderForm onOrderPlaced={() => console.log('Order placed')} />
                                    {selectedCustomerId && <OrderHistory customerId={selectedCustomerId} />}
                                </>
                            } />
                        </Routes>
                        {showModal && (
                            <Modal show={showModal} onHide={this.handleModalClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>{modalMessage}</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    {modalMessage === 'Enter the restock amount:' && (
                                        <Form>
                                            <Form.Group controlId="restockAmount">
                                                <Form.Label>Restock Amount</Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    value={restockAmount}
                                                    onChange={this.handleRestockAmountChange}
                                                />
                                            </Form.Group>
                                        </Form>
                                    )}
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={this.handleModalClose}>
                                        Close
                                    </Button>
                                    <Button variant="primary" onClick={this.handleModalConfirm}>
                                        Save Changes
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        )}
                    </Container>
                </div>
            </Router>
        );
    }
}

export default App;