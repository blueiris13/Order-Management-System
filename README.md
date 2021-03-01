## Readme

Group 78, 
Linshengyi Sun & Hyun Kim

### Project Title
Blizzard Order Management System

## Project Description
Front end code is written in React.js.<br>
Back end code is written in Node.js.

### Project Pages

#### Orders
This is Home page. 

CREATE functionality works when the "Add New Order" button is clicked. This will create a new row on the table with the dummy data (Customer ID and Order Date).
This is expected behavior. Users will be able to update/edit the data in the Order Details page in the final version.<br>
READ functionality works. The existing/newly added data will appear on the Orders table.

Related files - home.js, helloworld.js, hometable.js 

#### Order Details 
This page is accessible when clicking the rows on the Orders table.

CREATE functionality works with the Order Details form.<br>
*Note: Game Id(Game) can only be added once per order_id.

READ partially works. The table will fetch the correct data from Order_Games table, but still need to fetch the relevant data from Game table.

UPDATE/DELETE will be implemented.

Related files - orderdetail.js, orderdetailform.js, orderdetailtable.js

#### Customers
This page is accessible when clicking the "Customers" on the top menu.

CREATE functionality works with the Customers form.<br>
READ functionality works. The existing/newly added data will appear on the Customers table.

Related files - customer.js, customerform.js, customertable.js, customersearch.js

#### Games
This page is accessible when clicking the "Games" on the top menu.

CREATE functionality works with the Games form.<br>
READ functionality works. The existing/newly added data will appear on the Games table.

Related files - game.js, gameform.js, gametable.js, gamesearch.js

#### Backend Code

All backend code can be found in index.js file.