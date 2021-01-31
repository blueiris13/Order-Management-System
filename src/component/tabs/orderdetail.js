import React, {Component} from 'react';
import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import OrderDetailTable from "../orderdetailetable";


const formStyle = {
    display: "inline",
    padding: "4px"
};

const formContainerStyle = {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end"
};
class OrderDetail extends Component {
    render() {
        return (
            <div>
                <OrderDetailTable/>
                <div className='order-detail-button-container' style={formContainerStyle}>
                    <Form style={formStyle}>
                        <Button variant="primary" type="submit">
                            Add
                        </Button>
                    </Form>
                    <Form style={formStyle}>
                        <Button variant="primary" type="submit">
                            Edit
                        </Button>
                    </Form>
                    <Form style={formStyle}>
                        <Button variant="primary" type="submit">
                            Delete
                        </Button>
                    </Form>
                </div>
            </div>
        )
    }
}


export default OrderDetail