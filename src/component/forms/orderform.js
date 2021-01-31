import React, {Component} from 'react';
import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

class OrderForm extends Component {
    render() {
        return (
            <Form>
                <Form.Row>
                    <Form.Group as={Col} controlId="formCustomerName">
                        <Form.Label>Order ID</Form.Label>
                        <Form.Control type="orderID" placeholder="Enter new order ID" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formCustomerEmail">
                        <Form.Label>Customer ID</Form.Label>
                        <Form.Control type="customerID" placeholder="Enter new CustomerID" />
                    </Form.Group>
                </Form.Row>

                <Form.Group as={Col} controlId="formCustomerBlizzardID">
                    <Form.Label>Order Date</Form.Label>
                    <Form.Control type="orderDate" placeholder="Enter Order Date" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Add a Order
                </Button>

            </Form>
        );
    }
}

export default CustomerForm