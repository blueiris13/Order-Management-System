import React, {Component} from 'react';
import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

class CustomerForm extends Component {
    render() {
        return (
            <Form>
                <Form.Row>
                <Form.Group as={Col} controlId="formCustomerName">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control type="name" placeholder="Enter full name" />
                </Form.Group>

                <Form.Group as={Col} controlId="formCustomerEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>
                </Form.Row>

                <Form.Group as={Col} controlId="formCustomerBlizzardID">
                    <Form.Label>Blizzard ID</Form.Label>
                    <Form.Control type="blizzardID" placeholder="Enter Blizzard ID" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Add a Customer
                </Button>

            </Form>
        );
    }
}

export default CustomerForm