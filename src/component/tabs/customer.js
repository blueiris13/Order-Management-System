import React, {Component} from "react";
import CustomerTable from "../customertable"
import CustomerForm from "../forms/customerform";
import CustomerSearch from "../search/customersearch";

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
        fetch('http://flip1.engr.oregonstate.edu:7878/customers', {
            method: 'GET'
        }).then(res => res.json())
            .then(function (response) {
                console.log("here" + response.customers)
                context.setState({...context.state, customers: response.customers})
            });
    }
    // Get new customers data from the Customer form page.
    onCustomerAdded = (customers) => {
        console.log("customers here" + customers)
        this.setState({...this.state, customers: customers})
    }

    render() {
        console.log(`render from customer=${this.state.customers}`)
        return (
            <div className='hello-world'>
                <br>
                </br>
                <h1>Customers</h1>
                <br>
                </br>
                <CustomerForm onCustomerAdded={this.onCustomerAdded.bind(this)} />
                <br>
                </br>
                <CustomerSearch/>
                <CustomerTable customers={this.state.customers}/>
            </div>
        )
    }
}

export default Customer;