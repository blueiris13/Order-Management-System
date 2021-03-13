import React, {Component} from 'react';
import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";

const searchContainerStyle = {
    width: "100%",
    height: "45px",
    marginBottom: "10px",
    padding: "3px",
    display: "flex",
    justifyContent: "flex-end"

};

const searchBoxStyle ={
    marginRight: "6px"
}

class CustomerSearch extends Component {
    render() {
        return (
            <Form style={searchContainerStyle}>
                <Form.Group controlId="customerSearchForm" style={searchBoxStyle}>
                    <Form.Control type="search" placeholder="Search"/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Search
                </Button>
            </Form>
        )
    }
}

export default CustomerSearch;