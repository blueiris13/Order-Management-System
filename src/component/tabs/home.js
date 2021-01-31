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
            <br>
            </br>
            <OrdersTable onOrderRowClick={onGoToOrderDetail} />
            <div className='order-detail-button-container' style={formContainerStyle}>
                <Form style={formStyle} onClick={onGoToOrderDetail.bind(this, '')}>
                    <Button variant="primary" type="submit">
                        Add
                    </Button>
                    </Form>
                </div>


        </div>
    )
}

export default Home;