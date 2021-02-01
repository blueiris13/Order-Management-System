import React, {Component} from 'react';
import OrderDetailTable from "../orderdetailetable";


class OrderDetail extends Component {
    render() {
        return (
            <div>
                <h1>Order Detail</h1>
                <h5 align="left">Customer Name: </h5>
                <h5 align="left">Order Date: </h5>
                <OrderDetailTable/>
            </div>
        )
    }
}


export default OrderDetail