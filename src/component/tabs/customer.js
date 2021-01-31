import React from "react";
import CustomerTable from "../customertable"
import CustomerForm from "../forms/customerfrom";

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
            <br>
            </br>
            <CustomerTable/>
        </div>
    )
}
export default Customer;