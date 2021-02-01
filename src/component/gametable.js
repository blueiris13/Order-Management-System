import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

const columns = [
    { id: 'gameID', label: 'Game ID', minWidth: 100},
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'genre', label: 'Genre', minWidth: 130 },
    { id: 'price', label: 'Price', minWidth: 100 },
    { id: 'offline', label: 'Offline', minWidth: 130 },
    { id: 'platform', label: 'Platform', minWidth: 130 }
    ,
];

function createData(gameID, name, genre, price, offline, platform) {
    return { gameID, name, genre, price, offline, platform};
}


const rows = [
    createData('1', 'World of Barcraft', 'FPS', 35, 'Yes', 'Desktop'),
    createData('2', 'TopWatch', 'FPS', 35, 'Yes', 'Desktop'),
    createData('3', 'TopWatch II', 'FPS', 35, 'No', 'Desktop'),
    createData('4', 'Hurthstone', 'FPS', 35, 'Yes', 'Desktop'),
    createData('5', 'Ziablo', 'FPS', 35, 'Yes', 'Desktop'),
    createData('6', 'Ziablo II', 'FPS', 35, 'No', 'Desktop'),
    createData('7', 'MoonCraft', 'FPS', 35, 'Yes', 'Desktop'),
];

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 640,
    },
});

export default function StickyHeadTable() {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

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
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.gameID}>
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
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    );
}