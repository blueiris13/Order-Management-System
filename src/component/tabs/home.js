import React from "react";
import HomeTable from "../hometable";
import HelloWorld from "../helloworld";
import { useHistory } from "react-router-dom";

const Home = () => {
    const history = useHistory();

    const orderRowOnClick = (orderID) => {
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
            <HomeTable onOrderRowClick={orderRowOnClick} />
        </div>
    )
}

export default Home;