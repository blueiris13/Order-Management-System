import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    table: {
        minWidth: 640
    },
});

function ccyFormat(num) {
    return `${num.toFixed(2)}`;
}





function priceRow(qty, unit) {
    return qty * unit;
}

function createRow(gameID, gameName, qty, unit) {
    const price = priceRow(qty, unit);
    return { gameID, gameName, qty, unit, price };
}

function totalPrice(items) {
    return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

const rows = [
    createRow(1,'Ziablo', 2, 45),
    createRow(2, 'MoonCraft', 4, 39),
    createRow(3, 'TopWatch', 5, 23),
];

const invoiceTotal = totalPrice(rows);

export default function OrderDetailTable() {
    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="spanning table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center" colSpan={5}>
                            Order Details
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Game ID</TableCell>
                        <TableCell>Game Name</TableCell>
                        <TableCell align="center">Qty.</TableCell>
                        <TableCell>Unit</TableCell>
                        <TableCell align="right">Price</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.gameID}>
                            <TableCell>{row.gameID}</TableCell>
                            <TableCell align="left">{row.gameName}</TableCell>
                            <TableCell align="center">{row.qty}</TableCell>
                            <TableCell>{row.unit}</TableCell>
                            <TableCell align="right">{ccyFormat(row.price)}</TableCell>
                        </TableRow>
                    ))}

                    <TableRow>
                        <TableCell colSpan={3} align="right">Total</TableCell>
                        <TableCell colSpan={2} align="right">{ccyFormat(invoiceTotal)}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}
