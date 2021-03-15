import React, {Component} from 'react';
import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import {SERVER_URL} from "../../constants/serverconstants";

class GameForm extends Component {
    constructor(props) {
        super(props);
        this.state = {name: '', genre: '', price: '', offline: '', platform: ''};
        this.onGameAdded = props.onGameAdded;
    }

    // Handle change listener for form control.
    handleChange = (event) => {
        let fieldName = event.target.name;
        let fieldValue = event.target.value;
        this.setState({...this.state, [fieldName]: fieldValue})
    }

    // Event listener for "Add a Game" button.
    handleSubmit = (event) => {
        alert('Ok to Submit?');

        const that = this

        fetch(`${SERVER_URL}/games`, {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(res => res.json())
            .then(function (response) {
                that.onGameAdded(response.games);
                return response.games;
            });

        event.preventDefault();
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGameName">
                        <Form.Label>Game Name</Form.Label>
                        <Form.Control type="name" name="name" placeholder="Enter game name"
                                      defaultValue={this.state.name} onChange={this.handleChange.bind(this)} required/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGameGenre">
                        <Form.Label>Genre</Form.Label>
                        <Form.Control type="genre" name="genre" placeholder="Enter genre"
                                      defaultValue={this.state.genre} onChange={this.handleChange.bind(this)} required/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGamePrice">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="price" name="price" placeholder="Enter price"
                                      defaultValue={this.state.price} onChange={this.handleChange.bind(this)} required/>
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} controlId="formGameOffline">
                        <Form.Label>Offline Availability</Form.Label>
                        <Form.Control as="select" name="offline" defaultValue={this.state.offline}
                                      onChange={this.handleChange.bind(this)} required>
                            <option> Select</option>
                            <option value="1">Yes</option>
                            <option value="0">No</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGamePlatform">
                        <Form.Label>Platform</Form.Label>
                        <Form.Control as="select" name="platform" defaultValue={this.state.platform}
                                      onChange={this.handleChange.bind(this)} required>
                            <option> Select</option>
                            <option value="Desktop">Desktop</option>
                            <option value="Phone">Phone</option>
                        </Form.Control>
                    </Form.Group>
                </Form.Row>
                <Button variant="primary" type="submit">
                    Add a Game
                </Button>
            </Form>
        );
    }
}

export default GameForm