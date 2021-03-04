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

function totalPrice(items) {
    return items.map(({price}) => price).reduce((sum, i) => sum + i, 0);
}

// const invoiceTotal = totalPrice(rows);

const formStyle = {
    display: "inline",
    padding: "4px"
};

const detailTableStyle = {
    width: "100%",
};





class OrderDetailTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            order_games: props.order_games,
            currentId: 2
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (this.state.order_games !== nextProps.order_games) {
            this.setState({...this.state, order_games: nextProps.order_games})
        }
        return true
    }

    //
    // onRowAdd() {
    //     console.log('add button clicked')
    //     const newRows = this.state.order_games
    //     const newId = this.state.currentId + 1
    //     const fakeRow = createRow(newId, 'New Game', 1, 1)
    //     newRows.push(fakeRow)
    //     this.setState({
    //         order_games: newRows,
    //         currentId: newId
    //     })
    // }

    // {/*<Button variant="primary" type="submit" onClick={this.onRowAdd.bind(this)}>*/}
    // {/*    +*/}
    // {/*</Button>*/}

    render() {
        this.state.order_games.map((game) => (
            console.log("This is order_gamess:  " + JSON.stringify(game))
        ))
        return (
            <div>
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
                            {this.state.order_games.map((row) =>(
                                <TableRow key={row.game_id}>
                                    <TableCell>{row.game_id}</TableCell>
                                    <TableCell align="left">Game name</TableCell>
                                    <TableCell align="center">{row.quantity}</TableCell>
                                    {/*<TableCell align="center">{row.unit}</TableCell>*/}
                                    {/*<TableCell align="center">{ccyFormat(row)}</TableCell>*/}
                                    <TableCell align="center">{0}</TableCell>
                                    <TableCell align="center">{0}</TableCell>
                                    <TableCell align="right">
                                        <Dropdown>
                                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item href="#/action-1">Edit quantity</Dropdown.Item>
                                                <Dropdown.Item href="#/action-2">Delete</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </TableCell>
                                </TableRow>
                            ))}

                            <TableRow>
                                <TableCell colSpan={4} align="right">Total</TableCell>
                                <TableCell colSpan={2} align="right">0</TableCell>
                                {/*<TableCell colSpan={2} align="right">{ccyFormat(invoiceTotal)}</TableCell>*/}
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>

            </div>
        );
    }
}

export default OrderDetailTable