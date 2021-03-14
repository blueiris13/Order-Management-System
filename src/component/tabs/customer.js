import React, {Component} from "react";
import CustomerTable from "../customertable"
import CustomerForm from "../forms/customerform";
import {SERVER_URL} from "../../constants/serverconstants";
import SearchForm from "../search/searchForm";

class Customer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customers: []
        }
    }

    // Get all existing Customers data when the page is loaded.
    componentDidMount() {
        this.fetchAllCustomer()
    }

    fetchAllCustomer = (context) => {
        const that = this
        fetch(`${SERVER_URL}/customers`, {
            method: 'GET'
        }).then(res => res.json())
            .then(function (response) {
                that.setState({...that.state, customers: response.customers})
            });
    }
    // Get new customers data from the Customer form page.
    onCustomerAdded = (customers) => {
        this.setState({...this.state, customers: customers})
    }

    onSearchFind = (customers) => {
        this.setState({...this.state, customers: customers})
    }

    handleSearchSubmit = (event, query) => {
        const that = this
        fetch(`${SERVER_URL}/customers_search?query=${query}`, {
            method: 'GET',
            // convert the React state to JSON and send it as the POST body
        }).then(res => res.json())
            .then(function (response) {
                that.onSearchFind(response.customers);
                return response.customers;
            });

        event.preventDefault();
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
                <SearchForm handleSearchSubmit={this.handleSearchSubmit.bind(this)} onResetTable={this.fetchAllCustomer.bind(this)}/>
                <CustomerTable customers={this.state.customers}/>
            </div>
        )
    }
}

export default Customer;