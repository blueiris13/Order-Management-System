import React, {Component} from 'react';
import OrderDetailTable from "../orderdetailetable";
import OrderDetailForm from "../forms/orderdetailform";

class OrderDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            order_games: []
        }
    }

    // Get selected Order_Games data when the page is loaded.
    componentDidMount() {
        this.fetchAllOrder(this)
    }

    fetchAllOrder = (context) => {
        fetch('http://flip1.engr.oregonstate.edu:7878/order_games' + '?order_id=' + 'some number here', {
            method: 'GET'
        }).then(res => res.json())
            .then(function (response) {
                console.log("order_detail here " + response.order_games)
                context.setState({...context.state, order_games: response.order_games})
            });
    }

    render() {
        return (
            <div>
                <h1>Order Detail</h1>
                <br>
                </br>
                <OrderDetailForm/>
                <h5 align="left">Order ID: </h5>
                <h5 align="left">Customer Name: </h5>
                <h5 align="left">Order Date: </h5>
                <OrderDetailTable order_games={this.state.order_games}/>
            </div>
        )
    }
}


export default OrderDetail