import React, {Component} from 'react';
import {Nav, Navbar} from "react-bootstrap";
import {Route, Link } from "react-router-dom";
import Customer from "./tabs/customer";
import Home from "./tabs/home";
import Game from "./tabs/game";
import OrderDetail from "./tabs/orderdetail";

class Main extends Component {
    render() {
        return (
            <div>
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand as={Link} to="/">BOMS</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to="/">Orders</Nav.Link>
                        <Nav.Link as={Link} to="/customer">Customers</Nav.Link>
                        <Nav.Link as={Link} to="/game">Games</Nav.Link>
                    </Nav>
                </Navbar>
                <div className="content" style={{padding:"20px"}}>
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
