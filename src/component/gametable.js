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

// Table columns
const columns = [
    {id: 'game_id', label: 'Game ID', minWidth: 100},
    {id: 'name', label: 'Name', minWidth: 170},
    {id: 'genre', label: 'Genre', minWidth: 130},
    {id: 'price', label: 'Price', minWidth: 100},
    {id: 'offline', label: 'Offline', minWidth: 130},
    {id: 'platform', label: 'Platform', minWidth: 130}
    ,
];

// CSS Styling
const useStyles = theme => ({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 640,
    },
});

class GamesTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            games: props.games,
            page: 0,
            rowsPerPage: 10
        }
    }

    // Display the Games table with existing/newly added game data.
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (this.state.games !== nextProps.games) {
            this.setState({...this.state, games: nextProps.games})
        }
        return true
    }

    // Event listener for new page.
    handleChangePage = (event, newPage) => {
        this.setState({...this.state, page: newPage})
    };

    // Event listener for Rows per page.
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
                            {this.state.games.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.game_id}>
                                        {columns.map((column) => {
                                            let value = row[column.id];
                                            // If Offline data is 1, display as "Yes". If Offline data is 0, display as "No" on the table.
                                            if (column.id === 'offline') {
                                                if (row[column.id] === 1) {
                                                    value = 'Yes'
                                                } else {
                                                    value = 'No'
                                                }
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
                    count={this.state.games.length}
                    rowsPerPage={this.state.rowsPerPage}
                    page={this.state.page}
                    onChangePage={this.handleChangePage.bind(this)}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage.bind(this)}
                />
            </Paper>
        );
    }
}

export default withStyles(useStyles)(GamesTable)