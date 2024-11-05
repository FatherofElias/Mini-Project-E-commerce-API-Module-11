import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CustomerList from './components/Customer/CustomerList';
import CustomerForm from './components/Customer/CustomerForm';
import CustomerDetails from './components/Customer/CustomerDetails';
import UpdateCustomerForm from './components/Customer/UpdateCustomerForm';
import AddProduct from './components/Product/AddProduct';
import ListProducts from './components/Product/ListProducts';
import ProductDetails from './components/Product/ProductDetails';
import UpdateProduct from './components/Product/UpdateProduct';
import ConfirmationModal from './components/ConfirmationModal';
import ManageStock from './components/Product/ManageStock';
import RestockProducts from './components/Product/RestockProducts';
import PlaceOrderForm from './components/Order/PlaceOrderForm';
import OrderHistory from './components/Order/OrderHistory';
import OrderList from './components/Order/OrderList';
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
            modalAction: null
        };
        console.log('App component initialized');
    }

    handleCustomerSelect = (customerId) => {
        console.log('Customer selected:', customerId);
        this.setState({ selectedCustomerId: customerId });
    };

    handleProductSelect = (productId) => {
        console.log('Product selected:', productId);
        this.setState({ selectedProductId: productId });
    };

    handleModalOpen = (message, action) => {
        console.log('Modal opened with message:', message);
        this.setState({ showModal: true, modalMessage: message, modalAction: action });
    };

    handleModalClose = () => {
        console.log('Modal closed');
        this.setState({ showModal: false, modalMessage: '', modalAction: null });
    };

    handleModalConfirm = () => {
        console.log('Modal confirmed');
        if (this.state.modalAction) {
            this.state.modalAction();
        }
        this.handleModalClose();
    };

    handleDeleteProduct = (productId) => {
        this.handleModalOpen('Are you sure you want to delete this product?', () => {
            axios.delete(`/products/${productId}`)
                .then(response => {
                    console.log('Product deleted:', response.data);
                    this.setState({ selectedProductId: null });
                })
                .catch(error => console.error('Error deleting product:', error));
        });
    };

    handleCustomerAdded = () => {
        console.log('Customer added');
    };

    render() {
        const { selectedCustomerId, selectedProductId, showModal, modalMessage } = this.state;
        console.log('Rendering App component');

        return (
            <Router>
                <div className="app-container">
                    <nav>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/customers">Customers</Link></li>
                            <li><Link to="/products">Products</Link></li>
                            <li><Link to="/orders">Orders</Link></li>
                        </ul>
                    </nav>
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
                                <AddProduct />
                                <ListProducts />
                                {selectedProductId && (
                                    <>
                                        <ProductDetails productId={selectedProductId} onDelete={this.handleDeleteProduct} />
                                        <UpdateProduct productId={selectedProductId} />
                                    </>
                                )}
                                <ManageStock />
                                <RestockProducts />
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
                        <ConfirmationModal
                            message={modalMessage}
                            onConfirm={this.handleModalConfirm}
                            onCancel={this.handleModalClose}
                        />
                    )}
                </div>
            </Router>
        );
    }
}

export default App;