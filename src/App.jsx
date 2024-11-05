import React, { Component } from 'react';
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
import OrderTotalPrice from './components/Order/OrderTotalPrice';
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
            axios.delete(`http://127.0.0.1:5000/products/${productId}`)
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
            <div className="app-container">
                <h1>Customer and Product Management</h1>
                <CustomerForm onCustomerAdded={this.handleCustomerAdded} />
                <CustomerList onCustomerSelect={this.handleCustomerSelect} />
                {selectedCustomerId && (
                    <>
                        <CustomerDetails customerId={selectedCustomerId} />
                        <UpdateCustomerForm customerId={selectedCustomerId} />
                        <OrderList customerId={selectedCustomerId} onOrderSelect={this.handleProductSelect} />
                    </>
                )}

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
                <PlaceOrderForm onOrderPlaced={() => console.log('Order placed')} />
                {selectedCustomerId && <OrderHistory customerId={selectedCustomerId} />}
                {selectedCustomerId && <OrderTotalPrice customerId={selectedCustomerId} />}

                {showModal && (
                    <ConfirmationModal
                        message={modalMessage}
                        onConfirm={this.handleModalConfirm}
                        onCancel={this.handleModalClose}
                    />
                )}
            </div>
        );
    }
}

export default App;