import React, {Component} from "react";
import CustomerTable from "../customertable"
import CustomerForm from "../forms/customerform";
import CustomerSearch from "../search/customersearch";
import {SERVER_URL} from "../../constants/serverconstants";

class Customer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customers: []
        }
    }

    // Get all existing Customers data when the page is loaded.
    componentDidMount() {
        this.fetchAllCustomer(this)
    }

    fetchAllCustomer = (context) => {
        fetch(`${SERVER_URL}/customers`, {
            method: 'GET'
        }).then(res => res.json())
            .then(function (response) {
                context.setState({...context.state, customers: response.customers})
            });
    }
    // Get new customers data from the Customer form page.
    onCustomerAdded = (customers) => {
        this.setState({...this.state, customers: customers})
    }

    render() {
        return (
            <div className='hello-world'>
                <br>
                </br>
                <h1>Customers</h1>
                <br>
                </br>
                <CustomerForm onCustomerAdded={this.onCustomerAdded.bind(this)}/>
                <br>
                </br>
                <CustomerSearch/>
                <CustomerTable customers={this.state.customers}/>
            </div>
        )
    }
}

export default Customer;