import React, {Component} from 'react';
import {Nav, Navbar} from "react-bootstrap";
import {Route} from "react-router-dom";
import Customer from "./tabs/customer";
import Home from "./tabs/home";
import Game from "./tabs/game";
import OrderDetail from "./tabs/orderdetail";

class Main extends Component {
    render() {
        return (
            <div>
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="/">BOMS</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="/">Orders</Nav.Link>
                        <Nav.Link href="/customer">Customers</Nav.Link>
                        <Nav.Link href="/game">Games</Nav.Link>
                    </Nav>
                </Navbar>
                <div className="content">
                    <Route exact path="/" component={Home}/>
                    <Route path="/customer" component={Customer}/>
                    <Route path="/game" component={Game}/>
                    <Route path="/order-detail" component={OrderDetail} />
                </div>
            </div>
        );
    }
}

export default Main
