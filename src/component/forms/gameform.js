import React, {Component} from 'react';
import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

class GameForm extends Component {
    render() {
        return (
        <div>
            <Form>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGameName">
                        <Form.Label>Game Name</Form.Label>
                        <Form.Control type="name" placeholder="Enter game name" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGameGenre">
                        <Form.Label>Genre</Form.Label>
                        <Form.Control type="genre" placeholder="Enter genre" />
                    </Form.Group>

                    <Form.Group as={Col}  controlId="formGamePrice">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="price" placeholder="Enter price" />
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Col xs="auto">
                    <Form.Check aria-label="option 1" label="Offline play?"/>
                    </Col>

                    <Col xs="auto">
                    <Form.Group controlId="formGamePlatform">
                        <Form.Label>Platform</Form.Label>
                        <Form.Control as="select">
                            <option>Desktop</option>
                            <option>Phone</option>
                        </Form.Control>
                        </Form.Group>
                    </Col>
                </Form.Row>

                <Button variant="primary" type="submit">
                    Add a Game
                </Button>
            </Form>
        </div>
        );
    }
}

export default GameForm