import React, {Component} from 'react';
import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";


class OrderDetailForm extends Component {

    constructor(props) {
        super(props);
        this.state = {order_id: '', game_id: '', quantity: ''};
        this.onOrderGamesAdded = props.onOrderGamesAdded;
    }

    handleChange = (event) => {
        let fieldName = event.target.name;
        let fieldValue = event.target.value;
        this.setState({...this.state, [fieldName]: fieldValue})
    }

    handleSubmit = (event) => {
        alert('Ok to Submit?');

        const that = this

        fetch('http://flip1.engr.oregonstate.edu:7878/order_games', {
            method: 'POST',
            // We convert the React state to JSON and send it as the POST body
            body: JSON.stringify(this.state),
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(res => res.json())
            .then(function(response) {
                console.log(response.order_games)


                that.onOrderGamesAdded(response.order_games)
                return response.order_games;
        });

        event.preventDefault();
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Row>
                    <Form.Group as={Col} controlId="formOrderID">
                        <Form.Label>Order ID</Form.Label>
                        <Form.Control type="text" name="order_id" placeholder="Enter order id" defaultValue={this.state.order_id} onChange={this.handleChange.bind(this)} required />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formOrderGameID">
                        <Form.Label>Game ID</Form.Label>
                        <Form.Control type="text" name="game_id"  placeholder="Enter game id" defaultValue={this.state.game_id} onChange={this.handleChange.bind(this)} required />
                    </Form.Group>
                </Form.Row>

                <Form.Group as={Col} controlId="formOrderQuantity">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control type="number" name="quantity" placeholder="Enter quantity" defaultValue={this.state.quantity} onChange={this.handleChange.bind(this)} required />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Add an Order
                </Button>

            </Form>
        );
    }
}

export default OrderDetailForm