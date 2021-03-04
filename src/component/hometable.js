import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

const columns = [
    {id: 'order_id', label: 'Order ID', minWidth: 170},
    {id: 'customer_id', label: 'Customer ID', minWidth: 170},
    {id: 'order_date', label: 'Order Date', minWidth: 170},
];

const useStyles = ({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 640,
    },
});

class OrdersTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            page: 0,
            rowsPerPage: 10
        }
        this.onOrderRowClick = props.onOrderRowClick;
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (this.state.orders !== nextProps.orders) {
            this.setState({...this.state, orders: nextProps.orders})
        }
        return true
    }

    handleChangePage = (event, newPage) => {
        this.setState({...this.state, page: newPage});
    };

    handleChangeRowsPerPage = (event) => {
        this.setState({...this.state, page: 0, rowPerPage: +event.target.value})
    };

    render() {
        const {classes} = this.props;
        return (
            <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{minWidth: column.minWidth}}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.orders.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.order_id}
                                              onClick={this.onOrderRowClick.bind(this, row.order_id, row.customer_id)}>
                                        {columns.map((column) => {
                                            let value = row[column.id];
                                            if (value === null) {
                                                value = "Guest"
                                            }
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number' ? column.format(value) : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 30, 50]}
                    component="div"
                    count={this.state.orders.length}
                    rowsPerPage={this.state.rowsPerPage}
                    page={this.state.page}
                    onChangePage={this.handleChangePage.bind(this)}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage.bind(this)}
                />
            </Paper>
        );
    }
}

export default withStyles(useStyles)(OrdersTable)