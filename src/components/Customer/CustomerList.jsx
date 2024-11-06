import React, { Component } from 'react';
import { ListGroup } from 'react-bootstrap';
import axios from 'axios';

class CustomerList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customers: [],
            selectedCustomerId: null
        };
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:5000/customers')
            .then(response => {
                this.setState({ customers: response.data });
            })
            .catch(error => {
                console.error('There was an error fetching the customers!', error);
            });
    }

    selectCustomer = (id) => {
        this.setState({ selectedCustomerId: id });
        this.props.onCustomerSelect(id);
    }

    render() {
        const { customers } = this.state;

        return (
            <ListGroup>
                {customers.map(customer => (
                    <ListGroup.Item key={customer.id} onClick={() => this.selectCustomer(customer.id)}>
                        {customer.name}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        );
    }
}

export default CustomerList;