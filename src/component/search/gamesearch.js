import React, {Component} from 'react';
import {Form} from "react-bootstrap";

const searchContainerStyle = {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end"
};

class GameSearch extends Component {
    render() {
        return (
            <Form style={searchContainerStyle}>
                <Form.Group controlId="gameSearchForm">
                    <Form.Control type="search" placeholder="Search"/>
                </Form.Group>
            </Form>
        )
    }
}

export default GameSearch;