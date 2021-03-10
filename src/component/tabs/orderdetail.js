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
        this.state = {
            order_games: [],
            customers: [],
            customer_id: parsed.customerID,
            games: [],
            order_id: parsed.orderID,
            order_date: parsed.orderDate,
            customer_fetched: false
        }
    }

    // Get selected Order_Games and all Customers data when the page is loaded.
    componentDidMount() {
        this.fetchAllOrder(this)
        this.fetchAllCustomer(this)
    }

    // Get order_games info
    fetchAllOrder = (context) => {
        const order_id = this.state.order_id
        const order_games_url = `${SERVER_URL}/order_games?order_id=${order_id}`
        fetch(order_games_url, {
            method: 'GET'
        }).then(res => res.json())
            .then(function (response) {
                console.log("got right data? " + JSON.stringify(response.order_games))
                context.setState({...context.state, order_games: response.order_games})
            });
    }

    // Get all customers info
    fetchAllCustomer = (context) => {
        fetch(`${SERVER_URL}/customers`, {
            method: 'GET',
            // We convert the React state to JSON and send it as the POST body
        }).then(res => res.json())
            .then(function (response) {
                context.setState({...context.state, customers: response.customers, customer_fetched: true})
            });
    }

    // handleSubmit for Updating customer info in Orders table
    handleSubmitCustomer = (event) => {
        alert('Ok to Submit?');
        fetch(`${SERVER_URL}/order_customer`, {
            method: 'PUT',
            // We convert the React state to JSON and send it as the POST body
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

    // handleSubmit for deleting an order from Orders table
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

    goBack() {
        this.props.history.goBack('/');
    }

    handleChange = (event) => {
        let fieldName = event.target.name;
        let fieldValue = event.target.value;
        this.setState({...this.state, [fieldName]: fieldValue})
    }

    // fetchAllSelectedGames = (context) => {
    //     const orderId = this.state.order_id
    //     const orders_url = `${SERVER_URL}/order_selected?order_id=${orderId}`
    //     fetch(orders_url, {
    //         method: 'GET'
    //     }).then(res => res.json())
    //         .then(function (response) {
    //             context.setState({...context.state, order_info: response.order_info})
    //         });
    // }

    // fetchTheOrder = (context) => {
    //     const orderId = this.state.order_id
    //     const order_games_url = `${SERVER_URL}/order_games?order_id=${orderId}`
    //     fetch(order_games_url, {
    //         method: 'GET'
    //     }).then(res => res.json())
    //         .then(function (response) {
    //             context.setState({...context.state, order_games: response.order_games})
    //         });
    // }

    // Get new customers data from the Order_Games form page.
    onOrderGamesChanged = (order_games) => {
        this.setState({...this.state, order_games: order_games})
    }

    render() {
        // Create dropdown menu for Customer Name
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