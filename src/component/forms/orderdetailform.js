import React, {Component} from 'react';
import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import {SERVER_URL} from "../../constants/serverconstants";

const INVALID_GAME_ID = -1

class OrderDetailForm extends Component {
    constructor(props) {
        super(props);
        this.state = {games: [], quantity: '', order_id: parseInt(props.order_id)};
        this.onOrderGamesAdded = props.onOrderGamesAdded;
    }

    // Handle change listener for form control.
    handleChange = (event) => {
        let fieldName = event.target.name;
        let fieldValue = event.target.value;
        this.setState({...this.state, [fieldName]: fieldValue})
    }

    // Get all existing games in the Games table in the database.
    componentDidMount() {
        this.fetchAllGame(this)
    }

    // Function to get all existing games. This is to display all games in Game Name field in the form.
    fetchAllGame = (context) => {
        fetch(`${SERVER_URL}/games`, {
            method: 'GET',
        }).then(res => res.json())
            .then(function (response) {
                context.setState({...context.state, games: response.games})
            });
    }

    // Event listener for "Add an Order" button.
    handleSubmit = (event) => {
        // If the user didn't select any games, throw an alert.
        const gameID = this.state.game_id
        const isGameIdUndefined = !gameID
        if (gameID === INVALID_GAME_ID || isGameIdUndefined) {
            alert('Please select a game!');
            return
        }

        alert('Ok to Submit?');

        const that = this
        fetch(`${SERVER_URL}/order_games`, {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(res => res.json())
            .then(function (response) {
                that.onOrderGamesAdded(response.order_games)
            });

        event.preventDefault();
    }

    render() {

        // Create dropdown menu for Game Name.
        let games = this.state.games;
        let optionItems = games.map((game) =>
            <option key={game.game_id} value={game.game_id}> {game.name} </option>
        );

        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Row>
                    <Form.Group as={Col} controlId="formOrderGameID">
                        <Form.Label>Game Name</Form.Label>
                        <Form.Control as="select" name="game_id" defaultValue={this.state.name}
                                      onChange={this.handleChange.bind(this)} required>
                            <option key={INVALID_GAME_ID}> Select</option>
                            {optionItems}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formOrderQuantity">
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control type="number" name="quantity" placeholder="Enter quantity"
                                      defaultValue={this.state.quantity} onChange={this.handleChange.bind(this)}
                                      required/>
                    </Form.Group>
                </Form.Row>
                <Button variant="primary" type="submit">
                    Add an Order
                </Button>
            </Form>
        );
    }
}

export default OrderDetailForm