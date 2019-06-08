var keys = require("./keys.js");
var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: keys.password,
    database: "bamazon_db"
});

connection.connect(function(err) {
    if(err) throw err;
    console.log("connected as id " + connection.threadId + "\n");

    displayAllProducts();
});

// display table of all products, including id, names & prices
function displayAllProducts() {
    console.log("displaying table of all products");

    connection.query("SELECT * FROM products", function(error, response) {
        if (error) throw error;

        //console.log(response);

        // headers for table
        console.log("Item ID | Product | Department | Price | In Stock");

        // displays information in table format
        for(var i=0; i<response.length; i++) {
            console.log(response[i].item_id + " | " + response[i].product_name + " | " + response[i].department_name + " | " + response[i].price + " | " + response[i].stock_quantity);
        };
        
        console.log("\n");

        askUser();
    });
};

// ask user for ID of product they want to buy
// ask user for how many units they would like to buy
function askUser() {
    inquirer.prompt([
        {
            type: "number",
            message: "What is the Item ID for the product you want to buy?",
            name: "id"
        },
        {
            type: "number",
            message: "How many units of the product would you like to buy?",
            name: "amount"
        },
        {
            type: "confirm",
            message: "Are you sure this is your order?",
            name: "confirm",
            default: true
        }
    ]).then(function(response) {
        if(response.confirm) {
            console.log("Selection confirmed.");

            checkStock(response.id, response.amount);
        }
        else { // if user does not confirm, ask if they want to re-input answers
            inquirer.prompt([
                {
                    type: "confirm",
                    message: "Do you want to try inputing a product ID again?",
                    name: "again",
                    default: true
                }
            ]).then(function(res) {
                if(res.again) { // if user wants to re-input answers, re-run function
                    askUser();
                }
                else { // if they don't want to re-input answers, end program
                    connection.end();
                };
            });
        };
    });
};

// check if there is enough product to be purchased; if not display "Insufficient quantity!"
function checkStock(itemID, purchaseAmount) {
    connection.query("SELECT * FROM products WHERE item_id = ?", itemID, function(err, res) {
        if (err) throw err;

        //console.log(res)

        console.log("There are " + res[0].stock_quantity + " units in stock of item ID # " + res[0].item_id);

        if(purchaseAmount<=res[0].stock_quantity) {
            fulfillOrder(res[0].stock_quantity, purchaseAmount, res[0].item_id);

            totalCost(res[0].price, purchaseAmount);

            connection.end();
        }
        else { // if not enough stock, end program
            console.log("Insufficient quantity!");

            connection.end();
        };
    });
};

// if there is enough product, fulfill the customer's order & decrement product quantity in database
function fulfillOrder(stockAmount, purchaseAmount, productID) {
    console.log("Your order will now be fulfilled.");

    //query mysql to update new stock amount after user has purchased the purchaseAmount
    connection.query(
        "UPDATE products SET ? WHERE ?",
        [
            {stock_quantity: stockAmount-purchaseAmount},
            {item_id: productID}
        ],
        function(err, res) {
            if (err) throw err;

            console.log(res.affectedRows + " products updated! \n");
        }
    );

    // display the updated product
    connection.query("SELECT * FROM products WHERE item_id = ?", productID, function(err, response) {
        if (err) throw err;

        // console.log(response);

        // table headers
        console.log("Item ID | Product | Department | Price | In Stock");

        // show updated line in table format
        for(var i=0; i<response.length; i++) {
            console.log(response[i].item_id + " | " + response[i].product_name + " | " + response[i].department_name + " | " + response[i].price + " | " + response[i].stock_quantity);
        };
    });
};

// display total cost of purchase
function totalCost(productPrice, purchaseAmount) {
    console.log("Total Cost of Purchase: $" + productPrice*purchaseAmount);
};