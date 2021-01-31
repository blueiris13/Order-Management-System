import React from "react";
import CustomerTable from "../customertable"
import CustomerForm from "../forms/customerfrom";
import CustomerSearch from "../search/customersearch";

const Customer = () => {
    return (
        <div className='hello-world'>
            <br>
            </br>
            <h1>Customer!</h1>
            <br>
            </br>
            <CustomerForm/>
            <br>
            </br>
            <CustomerSearch/>
            <br>
            </br>
            <br>
            </br>
            <CustomerTable/>
        </div>
    )
}
export default Customer;