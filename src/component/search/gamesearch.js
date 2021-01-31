import React, {Component} from 'react';
import Button from "react-bootstrap/Button";
import {Form} from "react-bootstrap";

class GameSearch extends Component {
    render() {
        return (
            <Form>
                <Form.Group controlId="gameSearchForm">
                    <Form.Control type="search" placeholder="Search"/>
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Search
                </Button>
            </Form>
        )
    }
}

export default GameSearch;