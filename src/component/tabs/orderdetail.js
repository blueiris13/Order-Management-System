import React, {Component} from 'react';
import OrderDetailTable from "../orderdetailtable";
import OrderDetailForm from "../forms/orderdetailform";
import * as qs from 'query-string';
import {withRouter} from "react-router-dom";
import PropTypes from 'prop-types';


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
        this.state = {
            order_games: [],
            order_id: parsed.orderID
        }
    }

    // Get selected Order_Games data when the page is loaded.
    componentDidMount() {
        this.fetchAllOrder(this)
    }

    fetchAllOrder = (context) => {
        const orderId = this.state.order_id
        const order_games_url = `http://flip1.engr.oregonstate.edu:7878/order_games?order_id=${orderId}`
        fetch(order_games_url, {
            method: 'GET'
        }).then(res => res.json())
            .then(function (response) {
                context.setState({...context.state, order_games: response.order_games})
            });
    }

    // Get new customers data from the Order_Games form page.
    onOrderGamesAdded = (order_games) => {
        this.setState({...this.state, order_games: order_games})
    }

    render() {
        return (
            <div>
                <h1>Order Detail</h1>
                <br>
                </br>
                <OrderDetailForm onOrderGamesAdded={this.onOrderGamesAdded.bind(this)} orderId={this.state.order_id} />
                <h5 align="left">Order ID: </h5>
                <h5 align="left">Customer Name: </h5>
                <h5 align="left">Order Date: </h5>
                <OrderDetailTable order_games={this.state.order_games}/>
            </div>
        )
    }
}


export default withRouter(OrderDetail)