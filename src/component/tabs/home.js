import React, {Component} from "react";
import OrdersTable from "../hometable";
import HelloWorld from "../helloworld";
import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {SERVER_URL} from "../../constants/serverconstants";

const formStyle = {
    display: "inline",
    padding: "4px"
};

const formContainerStyle = {
    width: "100%",
    padding: "6px",
    display: "flex",
    justifyContent: "flex-end"
};


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: []
        }
    }

    onGoToOrderDetail = (orderID, customerID) => {
        this.props.history.push(`/order-detail?orderID=${orderID}&customerID=${customerID}`);
    }

    // Get all existing Orders data when the page is loaded.
    componentDidMount() {
        this.fetchAllOrders(this)
    }

    fetchAllOrders = (context) => {
        fetch(`${SERVER_URL}/orders`, {
            method: 'GET'
        }).then(res => res.json())
            .then(function (response) {
                context.setState({...context.state, orders: response.orders})
            });
    }


    handleSubmit = (event) => {
        alert('Create New Order?');

        const that = this

        fetch(`${SERVER_URL}/orders`, {
            method: 'POST',
            // convert the React state to JSON and send it as the POST body
            body: JSON.stringify({customer_id: null, order_date: '2021-01-01 10:10:10'}),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(res => res.json())
            .then(function (response) {
                that.onOrderAdded(response.orders)
                return response.orders;
            });

        event.preventDefault();
    }

    onOrderAdded = (orders) => {
        this.setState({...this.state, orders: orders})
    }

    render() {
        return (
            <div className='home'>
                <br>
                </br>
                <HelloWorld/>
                <br>
                </br>
                <div style={formContainerStyle}>
                    <Form style={formStyle} onSubmit={this.handleSubmit.bind(this)}>
                        <Button variant="primary" type="submit">
                            Add New Order
                        </Button>
                    </Form>

                </div>
                <div align={'right'}>
                    <p>* Click a row to access Order Details page.</p>
                </div>
                <OrdersTable onOrderRowClick={this.onGoToOrderDetail.bind(this)} orders={this.state.orders}/>
            </div>
        )
    }
}

export default Home;