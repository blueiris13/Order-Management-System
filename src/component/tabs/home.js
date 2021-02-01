import React from "react";
import OrdersTable from "../hometable";
import HelloWorld from "../helloworld";
import { useHistory } from "react-router-dom";
import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";


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

const Home = () => {
    const history = useHistory();

    const onGoToOrderDetail = (orderID) => {
        history.push("/order-detail?orderID=" + orderID);
    }

    return (
        <div className='home'>
            <br>
            </br>
            <HelloWorld />
            <br>
            </br>
            <div style={formContainerStyle}>
                <Form style={formStyle} onClick={onGoToOrderDetail.bind(this, '')}>
                    <Button variant="primary" type="submit">
                        Add New Order
                    </Button>
                </Form>
            </div>
            <OrdersTable onOrderRowClick={onGoToOrderDetail} />



        </div>
    )
}

export default Home;