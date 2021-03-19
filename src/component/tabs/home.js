import React, {Component} from "react";
import OrdersTable from "../hometable";
import HelloWorld from "../helloworld";
import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {SERVER_URL} from "../../constants/serverconstants";

// CSS Styling
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

// Function to add 0 in front of the number(time), if the number is less than 10.
function addZero(time) {
    if (time < 10) {
        time = "0" + time;
    }
    return time;
}

// Function to get the current date in "YYYY-MM-DD" format.
function getDate() {
    let today = new Date();
    return today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
}

// Function to get the current time in "00:00:00" format.
function getTime() {
    let today = new Date();
    return addZero(today.getHours()) + ":" + addZero(today.getMinutes()) + ":" + addZero(today.getSeconds());
}

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: []
        }
    }

    // Function to direct to the Order Detail page and add Order ID, Customer ID, Order Date in the queries.
    onGoToOrderDetail = (orderID, customerID, orderDate) => {
        this.props.history.push(`/order-detail?orderID=${orderID}&customerID=${customerID}&orderDate=${orderDate}`);
    }

    // Get all existing Orders data when the page is loaded.
    componentDidMount() {
        this.fetchAllOrders(this)
    }

    // Function to get all existing Orders data from the Orders table in the database.
    fetchAllOrders = (context) => {
        fetch(`${SERVER_URL}/orders`, {
            method: 'GET'
        }).then(res => res.json())
            .then(function (response) {
                context.setState({...context.state, orders: response.orders})
            });
    }

    // Event listener for "Add New Order" button.
    handleSubmit = (event) => {
        alert('Create New Order?');

        const that = this
        fetch(`${SERVER_URL}/orders`, {
            method: 'POST',
            body: JSON.stringify({customer_id: null, order_date: getDate() + ' ' + getTime()}),
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

    // Function to set the Orders to the state.
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