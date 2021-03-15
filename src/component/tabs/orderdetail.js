import React, {Component} from 'react';
import OrderDetailTable from "../orderdetailtable";
import OrderDetailForm from "../forms/orderdetailform";
import * as qs from 'query-string';
import {withRouter} from "react-router-dom";
import PropTypes from 'prop-types';
import {SERVER_URL} from "../../constants/serverconstants";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import {Form} from "react-bootstrap";

// CSS Styling
const orderDetailInfoContainer = {
    width: "90%",
    padding: "7px",
    justifyContent: "flex-start",
    alignItems: "left",
};

const buttonContainerStyle = {
    padding: "15px",

}

const buttonStyle = {
    margin: "7px",
}

const GUEST_CUSTOMER_ID = -1

class OrderDetail extends Component {
    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    }

    constructor(props) {
        super(props);
        const {location} = this.props
        const parsed = qs.parse(location.search);
        this.goBack = this.goBack.bind(this);
        let order_date = parsed.orderDate
        order_date = order_date.slice(0, 10) + " " + order_date.slice(11, 19) + " UTC"

        this.state = {
            order_games: [],
            customers: [],
            customer_id: parsed.customerID,
            games: [],
            order_id: parsed.orderID,
            order_date: order_date,
            customer_fetched: false
        }
    }

    // Get selected Order_Games and all Customers data from the database when the page is loaded.
    componentDidMount() {
        this.fetchAllOrder(this)
        this.fetchAllCustomer(this)
    }

    // Get selected Order_Games info from the Order_Games table in the database.
    fetchAllOrder = (context) => {
        const order_id = this.state.order_id
        const order_games_url = `${SERVER_URL}/order_games?order_id=${order_id}`
        fetch(order_games_url, {
            method: 'GET'
        }).then(res => res.json())
            .then(function (response) {
                context.setState({...context.state, order_games: response.order_games})
            });
    }

    // Get all customers info from the Customers table in the database. This is to display the select options for the Customer Name.
    fetchAllCustomer = (context) => {
        fetch(`${SERVER_URL}/customers`, {
            method: 'GET',
        }).then(res => res.json())
            .then(function (response) {
                context.setState({...context.state, customers: response.customers, customer_fetched: true})
            });
    }

    // Event listener for "Update" button right next to Customer Name. This is to update customer_id in Orders table.
    handleSubmitCustomer = (event) => {
        alert('Ok to Submit?');
        fetch(`${SERVER_URL}/order_customer`, {
            method: 'PUT',
            body: JSON.stringify({customer_id: this.state.customer_id, order_id: this.state.order_id}),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(res => res.json())
            .then(function (response) {
                return response.order_games;
            });

        event.preventDefault();
    }

    // Even listener for "Delete Entire Order" button. This is to delete an order from Orders table.
    handleSubmitDelete = (event) => {
        alert('Do you want to delete the entire order?');
        const that = this
        const order_id = this.state.order_id
        fetch(`${SERVER_URL}/delete_order?orderID=${order_id}`, {
            method: 'DELETE',
        }).then(res => res.json())
            .then(function (response) {
                that.goBack()
                return response.order_games;
            });

        event.preventDefault();
    }

    // Function to go back to the Order page.
    goBack() {
        this.props.history.goBack('/');
    }

    // Onchange listener for form control.
    handleChange = (event) => {
        let fieldName = event.target.name;
        let fieldValue = event.target.value;
        this.setState({...this.state, [fieldName]: fieldValue})
    }

    // Function to set the Order_Games to the state.
    onOrderGamesChanged = (order_games) => {
        this.setState({...this.state, order_games: order_games})
    }

    render() {
        // Create a dropdown menu for Customer Name.
        let customers = this.state.customers;
        let optionItems = []
        if (this.state.customer_fetched) {
            optionItems.push(<option key={GUEST_CUSTOMER_ID}>Guest</option>)
        }
        customers.forEach((customer) => {
            optionItems.push(<option key={customer.customer_id}
                                     value={customer.customer_id}> {customer.full_name} </option>)
        });
        return (
            <div>
                <h1>Order Detail</h1>
                <br>
                </br>
                <OrderDetailForm onOrderGamesAdded={this.onOrderGamesChanged.bind(this)}
                                 order_id={this.state.order_id}/>
                <br>
                </br>
                <div style={orderDetailInfoContainer}>
                    <h5 align="left">Order ID : {this.state.order_id}</h5>
                </div>
                <div style={orderDetailInfoContainer}>
                    <h5 align="left">
                        <Form onSubmit={this.handleSubmitCustomer}>
                            <Form.Row>
                                <Form.Label>Customer Name : </Form.Label>
                                <Col xs={3}>
                                    <Form.Control as="select" name="customer_id" value={this.state.customer_id}
                                                  onChange={this.handleChange.bind(this)}
                                                  required>
                                        {optionItems}
                                    </Form.Control>
                                </Col>
                                <Button variant="primary" type="submit">
                                    Update
                                </Button>
                            </Form.Row>
                        </Form>
                    </h5>
                </div>
                <div style={orderDetailInfoContainer}>
                    <h5 align="left">Order Date : {this.state.order_date}</h5>
                </div>
                <div align="right" style={buttonContainerStyle}>
                    <Form onSubmit={this.handleSubmitDelete}>
                        <Button variant="outline-danger" type="submit" style={buttonStyle}>
                            Delete Entire Order
                        </Button>
                    </Form>
                </div>
                <OrderDetailTable order_games={this.state.order_games} order_id={this.state.order_id}
                                  updateCallback={this.onOrderGamesChanged.bind(this)}/>
            </div>
        )
    }
}


export default withRouter(OrderDetail)