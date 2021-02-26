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
    {id: 'customer_id', label: 'Customer ID', minWidth: 150},
    {id: 'full_name', label: 'Name', minWidth: 170},
    {id: 'email', label: 'Email', minWidth: 170},
    {id: 'blizzard_id', label: 'Blizzard ID', minWidth: 170},
];

const useStyles = theme => ({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 640,
    },
});

class CustomersTable extends Component {
    constructor(props) {
        super(props);
        console.log("customer table" + props.customers)
        this.state = {
            customers: props.customers,
            page: 0,
            rowsPerPage: 10
        };
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (this.state.customers !== nextProps.customers) {
            this.setState({...this.state, customers: nextProps.customers})
        }
        return true
    }

    handleChangePage = (event, newPage) => {
        this.setState({...this.state, page: newPage})
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
                            {this.state.customers.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.customer_id}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
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
                    count={this.state.customers.length}
                    rowsPerPage={this.state.rowsPerPage}
                    page={this.state.page}
                    onChangePage={this.handleChangePage.bind(this)}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage.bind(this)}
                />
            </Paper>
        );
    }
}

export default withStyles(useStyles)(CustomersTable)