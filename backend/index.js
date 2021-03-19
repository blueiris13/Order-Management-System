var express = require('express');
var mysql = require('./dbcon.js');
var CORS = require('cors')

var app = express();

app.set('port', 7811);

app.use(express.json());
app.use(express.urlencoded({exteneded: false}));
app.use("/public", express.static('./public/'));
app.use(CORS());

// ----------------------------------------------------------- Games -----------------------------------------------------------

// Games Table Query

const getAllGamesQuery = 'SELECT * FROM Games';
const insertGamesQuery = 'INSERT INTO Games (`name`, `genre`, `price`, `offline`, `platform`) VALUES (?, ?, ?, ?, ?);'
const searchGamesQuery = 'SELECT * FROM Games WHERE name LIKE ? OR genre LIKE ? OR platform LIKE ?'
const dropGamesTableQuery = 'DROP TABLE IF EXISTS Games;';
const createGamesTableQuery = `CREATE TABLE Games(
                            game_id INT(11) PRIMARY KEY AUTO_INCREMENT,
                            name VARCHAR(255) NOT NULL,
                            genre VARCHAR(255) NOT NULL,
                            price INT(11) NOT NULL,
                            offline BOOLEAN NOT NULL default 0,
                            platform VARCHAR(255) NOT NULL);`;


// Get all data in the Games table.
const getAllGamesData = (req, res, next) => {
    mysql.pool.query(getAllGamesQuery, (err, rows, fields) => {
        if (err) {
            next(err);
            return;
        }
        res.json({"games": rows});
    })
}

// Get all data in the Games table and send it to the client.
app.get('/games', function (req, res, next) {
    getAllGamesData(req, res, next);
});

// Add a row in the Games table and send all Games data to the client.
app.post('/games', function (req, res, next) {
    var {name, genre, price, offline, platform} = req.body;
    mysql.pool.query(insertGamesQuery, [name, genre, price, offline, platform], (err, result) => {
        if (err) {
            next(err);
            return;
        }
        getAllGamesData(req, res, next);
    });
});

// Search strings in the Games table.
app.get('/games_search', function (req, res, next) {
    let search = req.query.query
    let search_like = '%' + search + '%'
    mysql.pool.query(searchGamesQuery, [search_like, search_like, search_like], (err, rows, fields) => {
        if (err) {
            next(err);
            return;
        }
        res.json({"games": rows});
    })
});

// ----------------------------------------------------------- Customers -----------------------------------------------------------

// Customers Table Query

const getAllCustomersQuery = 'SELECT * FROM Customers';
const insertCustomersQuery = 'INSERT INTO Customers (`full_name`, `email`, `blizzard_id`) VALUES (?, ?, ?);'
const searchCustomersQuery = 'SELECT * FROM Customers WHERE full_name LIKE ? OR email LIKE ? OR blizzard_id LIKE ?'
const dropCustomersTableQuery = 'DROP TABLE IF EXISTS Customers;';
const createCustomersTableQuery = `CREATE TABLE Customers(
                                customer_id int(11) PRIMARY KEY AUTO_INCREMENT,
                                full_name varchar(255) NOT NULL,
                                email varchar(255) NOT NULL,
                                blizzard_id varchar(255) DEFAULT NULL);`;


// Get all data in the Customers table.
const getAllCustomersData = (req, res, next) => {
    mysql.pool.query(getAllCustomersQuery, (err, rows, fields) => {
        if (err) {
            next(err);
            return;
        }
        res.json({"customers": rows});
    })
}

// Get all data in the Customers table and send it to the client.
app.get('/customers', function (req, res, next) {
    getAllCustomersData(req, res, next);
});

// Add a row in the Customers table and send all Customers data to the client.
app.post('/customers', function (req, res, next) {
    var {full_name, email, blizzard_id} = req.body;
    mysql.pool.query(insertCustomersQuery, [full_name, email, blizzard_id], (err, result) => {
        if (err) {
            next(err);
            return;
        }
        getAllCustomersData(req, res, next);
    });
});

// Search strings in the Customers table.
app.get('/customers_search', function (req, res, next) {
    let search = req.query.query
    let search_like = '%' + search + '%'
    mysql.pool.query(searchCustomersQuery, [search_like, search_like, search_like], (err, rows, fields) => {
        if (err) {
            next(err);
            return;
        }
        res.json({"customers": rows});
    })
});

// ----------------------------------------------------------- Orders -----------------------------------------------------------

// Orders Table Query

const getAllOrdersQuery = 'SELECT * FROM Orders';
const insertOrdersQuery = 'INSERT INTO Orders (`customer_id`, `order_date`) VALUES (?, ?);'
const updateOrdersCustomerQuery = 'UPDATE Orders SET customer_id=? WHERE order_id=? ';
const deleteOrdersQuery = 'DELETE FROM Orders WHERE order_id=?';
const dropOrdersTableQuery = 'DROP TABLE IF EXISTS Orders;';
const createOrdersTableQuery = `CREATE TABLE Orders(
                                order_id int(11) PRIMARY KEY AUTO_INCREMENT,
                                customer_id int(11),
                                order_date datetime NOT NULL,
                                CONSTRAINT orders_fk_customer FOREIGN KEY (customer_id) REFERENCES Customers (customer_id));`;


// Get all data in the Orders table.
const getAllOrdersData = (req, res, next) => {
    mysql.pool.query(getAllOrdersQuery, (err, rows, fields) => {
        if (err) {
            next(err);
            return;
        }
        res.json({"orders": rows});
    })
}

// Get all data in the Orders table and send it to the client.
app.get('/orders', function (req, res, next) {
    getAllOrdersData(req, res, next);
});

// Add a row in the Orders table and send all data to the client.
app.post('/orders', function (req, res, next) {
    var {customer_id, order_date} = req.body;
    mysql.pool.query(insertOrdersQuery, [customer_id, order_date], (err, result) => {
        if (err) {
            next(err);
            return;
        }
        getAllOrdersData(req, res, next);
    });
});

// Update a row in the Orders table.
app.put('/order_customer', function (req, res, next) {
    var {customer_id, order_id} = req.body;
    mysql.pool.query(updateOrdersCustomerQuery, [customer_id, order_id], (err, result) => {
        if (err) {
            next(err);
            return;
        }
        res.json({});
    });
});

// Delete a row from the Orders table.
app.delete('/delete_order', function (req, res, next) {
    // Delete all releated order_games data from the Order_Games table (M:M table).
    mysql.pool.query(deleteOrderGamesQuery, [req.query.orderID], (err, result) => {
        // Delete a selected order data from the Orders table.
        mysql.pool.query(deleteOrdersQuery, [req.query.orderID], (err, result) => {
            if (err) {
                next(err);
                return;
            }
            res.json({});
        })
        if (err) {
            next(err);
            return;
        }
    });
});

// ----------------------------------------------------------- Order_Games -----------------------------------------------------------

// Order_Games Table Query

const getSelectedOrderGamesQueryWithGameId = 'SELECT * FROM Order_Games WHERE order_id=? AND game_id=?';
const getSelectedOrderGameswithGamesInfo = 'SELECT * FROM Order_Games INNER JOIN Games ON Order_Games.game_id = Games.game_id WHERE Order_Games.order_id=? ORDER BY Order_Games.game_id ASC'
const insertOrderGamesQuery = 'INSERT INTO Order_Games (`order_id`, `game_id`, `quantity`) VALUES (?, ?, ?);'
const updateOrderGamesQuery = 'UPDATE Order_Games SET quantity=? WHERE order_id=? AND game_id=?';
const deleteOrderGamesQuery = 'DELETE FROM Order_Games WHERE order_id=?';
const deleteSelectedGamesOnlyQuery = 'DELETE FROM Order_Games WHERE order_id=? AND game_id=?';
const dropOrderGamesTableQuery = 'DROP TABLE IF EXISTS Order_Games;';
const createOrderGamesTableQuery = `CREATE TABLE Order_Games(
                                order_id int(11),
                                game_id int(11),
                                quantity int(11) NOT NULL,
                                CONSTRAINT order_games_fk_order FOREIGN KEY (order_id) REFERENCES Orders (order_id),
                                CONSTRAINT order_games_fk_game FOREIGN KEY (game_id) REFERENCES Games (game_id));`;


// Get selected data (Order ID) from the Order_Games table (inner joined with Games table) from the database.
const getAllSelectedOrderGamesWithGamesInfo = (order_id, res, next) => {
    mysql.pool.query(getSelectedOrderGameswithGamesInfo, [order_id], (err, rows, fields) => {
        if (err) {
            next(err);
            return;
        }
        res.json({"order_games": rows});
    })
}

// Get selected data (Order ID) from the Order_Games table.
app.get('/order_games', function (req, res, next) {
    getAllSelectedOrderGamesWithGamesInfo([req.query.order_id], res, next);
});

// Add a row in the Order_Games table in the database and send all selected data to the client.
app.post('/order_games', function (req, res, next) {
    var {order_id, game_id, quantity} = req.body;

    // Check if the game exists with the corresponding order ID.
    mysql.pool.query(getSelectedOrderGamesQueryWithGameId, [order_id, game_id], (err, result) => {
        if (err) {
            next(err);
            return;
        }

        // If the game exists, update the quantity by adding the existing quantity + the new quanity.
        if (result.length != 0) {
            const new_quantity = parseInt(quantity) + parseInt(result[0].quantity)

            mysql.pool.query(updateOrderGamesQuery, [new_quantity, order_id, game_id], (err, result) => {
                if (err) {
                    next(err);
                    return;
                }
                getAllSelectedOrderGamesWithGamesInfo(order_id, res, next);
            })
        } else {

            // If the game doesn't exist, add a new game.
            mysql.pool.query(insertOrderGamesQuery, [order_id, game_id, quantity], (err, result) => {
                if (err) {
                    next(err);
                    return;
                }
                getAllSelectedOrderGamesWithGamesInfo(order_id, res, next);
            })
        }
    })
})

// Delete a row from the Order_Games table.
app.delete('/order_games_delete', function (req, res, next) {
    mysql.pool.query(deleteSelectedGamesOnlyQuery, [req.query.orderID, req.query.gameID], (err, result) => {
        if (err) {
            next(err);
            return;
        }
        getAllSelectedOrderGamesWithGamesInfo(req.query.orderID, res, next);
    })
});

// Update a row in the Order_Games table.
app.put('/order_games_quantity', function (req, res, next) {
    var {quantity, game_id, order_id} = req.body;
    mysql.pool.query(updateOrderGamesQuery, [quantity, order_id, game_id], (err, result) => {
        if (err) {
            next(err);
            return;
        }
        getAllSelectedOrderGamesWithGamesInfo(order_id, res, next);
    })
});

//  ----------------------------------------------------------- Reset -----------------------------------------------------------

// Reset Query               

const resetQuery =
    `${dropOrderGamesTableQuery}
${dropOrdersTableQuery}
${dropCustomersTableQuery}
${dropGamesTableQuery}
${createGamesTableQuery}
${createCustomersTableQuery}
${createOrdersTableQuery}
${createOrderGamesTableQuery}`

// Reset all tables in the database.
app.get('/reset', function (req, res, next) {
    var context = {};
    mysql.pool.query(resetQuery, function (err) {
    })
    res.json(context)
});

app.listen(app.get('port'), function () {
    console.log(`Express started on http://${process.env.HOSTNAME}:${app.get('port')}; press Ctrl-C to terminate.`);
});
