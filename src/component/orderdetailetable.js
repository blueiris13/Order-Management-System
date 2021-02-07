import React, {Component} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Dropdown} from "react-bootstrap";
import Button from "react-bootstrap/Button";

function ccyFormat(num) {
    return `${num.toFixed(2)}`;
}


function priceRow(qty, unit) {
    return qty * unit;
}

function createRow(gameID, gameName, qty, unit) {
    const price = priceRow(qty, unit);
    return {gameID, gameName, qty, unit, price};
}

function totalPrice(items) {
    return items.map(({price}) => price).reduce((sum, i) => sum + i, 0);
}

const rows = [
    createRow(1, 'Ziablo', 2, 45),
    createRow(2, 'MoonCraft', 4, 39),
    createRow(3, 'TopWatch', 5, 23),
];

const invoiceTotal = totalPrice(rows);

const formStyle = {
    display: "inline",
    padding: "4px"
};

const detailTableStyle = {
    width: "100%",
};

const buttonContainerStyle = {
    padding: "15px",
}

const buttonStyle = {
    margin: "7px",
}



class OrderDetailTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailRows: rows,
            currentId: 3
        }
        console.log("constructor")
    }

    onRowAdd() {
        console.log('add button clicked')
        const newRows = this.state.detailRows
        const newId = this.state.currentId + 1
        const fakeRow = createRow(newId, 'New Game', 1, 1)
        newRows.push(fakeRow)
        this.setState({
            detailRows: newRows,
            currentId: newId
        })
    }
    render() {
        return (
            <div>
                <div align="right" style={buttonContainerStyle}>
                    <Button variant="outline-danger" type="submit" style={buttonStyle}>
                        Delete Entire Order
                    </Button>
                    <Button variant="primary" type="submit" onClick={this.onRowAdd.bind(this)}>
                        +
                    </Button>
                </div>
                <TableContainer component={Paper} style={detailTableStyle}>
                    <Table aria-label="spanning table">
                        <TableHead>
                            <TableRow>
                            </TableRow>
                            <TableRow>
                                <TableCell>Game ID</TableCell>
                                <TableCell>Game Name</TableCell>
                                <TableCell align="center">Qty.</TableCell>
                                <TableCell align="center">Unit</TableCell>
                                <TableCell align="center">Price</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.detailRows.map((row) => (
                                <TableRow key={row.gameID}>
                                    <TableCell>{row.gameID}</TableCell>
                                    <TableCell align="left">{row.gameName}</TableCell>
                                    <TableCell align="center">{row.qty}</TableCell>
                                    <TableCell align="center">{row.unit}</TableCell>
                                    <TableCell align="center">{ccyFormat(row.price)}</TableCell>
                                    <TableCell align="right">
                                        <Dropdown>
                                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item href="#/action-1">Edit</Dropdown.Item>
                                                <Dropdown.Item href="#/action-2">Delete</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </TableCell>
                                </TableRow>
                            ))}

                            <TableRow>
                                <TableCell colSpan={4} align="right">Total</TableCell>
                                <TableCell colSpan={2} align="right">{ccyFormat(invoiceTotal)}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>

            </div>
        );

    }


}

export default OrderDetailTable