//****************************************************************************
//
// Dana Yarges
// Amy Salley
// CS 340
//
// Code modified from CS 340 Node.js starter code
// https://github.com/osu-cs340-ecampus/nodejs-starter-app
//
//****************************************************************************

// App.js

/*
    SETUP
*/

PORT = 49535;                            // Set a port number at the top so it's easy to change in the future
var express = require('express');               // We are using the express library for the web server
var app = express();                        // We need to instantiate an express object to interact with the server in our code
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({ extname: ".hbs" }));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.
app.use(express.static('views'));


// Database
var db = require('./database/db-connector')

/*
    ROUTES
*/

/* Homepage, Index */
app.get('/', function (req, res) {
    res.render('index');                    // Note the call to render() and not send(). Using render() ensures the templating engine
});                                         // will process this file, before sending the finished HTML to the client.

app.get('/index', function (req, res) {
    res.render('index');
});

/* Customers */
// Show all customers
app.get('/customers', function (req, res) {
    let query1 = "SELECT * FROM Customers;";                // Define our query

    db.pool.query(query1, function (error, rows, fields) {    // Execute the query

        res.render('customers', { data: rows });              // Render the customers.hbs file, and also send the renderer
    })                                                      // an object where 'data' is equal to the 'rows' we
});                                                         // received back from the query

// Show customers search results
app.post('/search-customers-form', function (req, res) {
    let data = req.body;
    let query1 = `SELECT * FROM Customers WHERE first_name = '${data['first_name_entered']}' OR last_name = '${data['last_name_entered']}';`;
    db.pool.query(query1, function (error, rows, fields) {

        res.render('customers', { data: rows });
    })
});

// Add new customer page    
app.get('/new_customer', function (req, res) {
    res.render('new_customer');
});

// Add a new customer
app.post('/new-customer-form', function (req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Customers (first_name, last_name, email, street_address, city, state, zip_code) VALUES ('${data['first_name_input']}', '${data['last_name_input']}', '${data['email_input']}', '${data['street_address_input']}', '${data['city_input']}', '${data['state_input']}', '${data['zip_code_input']}');`;
    db.pool.query(query1, function (error, rows, fields) {

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our Customers page
        else {
            let query1 = "SELECT * FROM Customers;";
            db.pool.query(query1, function (error, rows, fields) {
                res.render('customers', { data: rows });
            })
        }
    })
})

// Edit customer page   
// Populate fields for editing 
app.post('/edit-customer-form', function (req, res) {
    let data = req.body;
    let update_customer = parseInt(data.edit_customer_id_selected)

    let query1 = `SELECT customer_id, first_name, last_name, email, street_address, city, state, zip_code FROM Customers WHERE customer_id = ${update_customer};`;
    db.pool.query(query1, function (error, rows, fields) {
        res.render('edit_customer', { data: rows });
    })
});

// Update customer info
app.post('/update-customer-form', function (req, res) {
    let data = req.body;
    let update_customer = parseInt(data.customer_id_update)

    let query1 = `UPDATE Customers SET first_name = '${data['first_name_update']}', last_name = '${data['last_name_update']}', email = '${data['email_update']}', street_address = '${data['street_address_update']}', city = '${data['city_update']}', state = '${data['state_update']}', zip_code = '${data['zip_code_update']}' WHERE customer_id = ${update_customer};`;
    db.pool.query(query1, function (error, rows, fields) {
        let query2 = "SELECT * FROM Customers;";
        db.pool.query(query2, function (error, rows, fields) {
            res.render('customers', { data: rows });
        })
    })
});

// Delete customer
app.post('/delete-customer-form', function (req, res) {
    let data = req.body;
    let delete_customer = parseInt(data.customer_id_selected)

    let query1 = `DELETE FROM Customers WHERE customer_id = ${delete_customer};`;
    db.pool.query(query1, function (error, rows, fields) {
        let query2 = "SELECT * FROM Customers;";
        db.pool.query(query2, function (error, rows, fields) {
            res.render('customers', { data: rows });
        })
    })
});

/* Books */
// Show all books   
app.get('/books', function (req, res) {
    let query1 = "SELECT * FROM Books ORDER BY author;";                    // Define our query

    db.pool.query(query1, function (error, rows, fields) {    // Execute the query

        res.render('books', { data: rows });                  // Render the books.hbs file, and also send the renderer
    })                                                      // an object where 'data' is equal to the 'rows' we
});                                                         // received back from the query

// Show books search results
app.post('/search-books-form', function (req, res) {
    let data = req.body;
    let query1 = `SELECT * FROM Books WHERE title = '${data['title_entered']}' OR author = '${data['author_entered']}';`;
    db.pool.query(query1, function (error, rows, fields) {

        res.render('books', { data: rows });
    })
});

// Add new book page    
app.get('/new_book', function (req, res) {
    res.render('new_book');
});

// Add a new book
app.post('/new-book-form', function (req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Books (title, author, genre, price, quantity_in_stock) VALUES ('${data['title_input']}', '${data['author_input']}', '${data['genre_input']}', '${data['price_input']}', '${data['quantity_in_stock_input']}')`;
    db.pool.query(query1, function (error, rows, fields) {

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our Books page
        else {
            let query1 = "SELECT * FROM Books;";
            db.pool.query(query1, function (error, rows, fields) {
                res.render('books', { data: rows });
            })
        }
    })
})

// Edit book page  
// Populate fields for editing  
app.post('/edit-book-form', function (req, res) {
    let data = req.body;
    let update_book = parseInt(data.edit_book_id_selected)

    let query1 = `SELECT book_id, title, author, genre, price, quantity_in_stock FROM Books WHERE book_id = ${update_book};`;
    db.pool.query(query1, function (error, rows, fields) {
        res.render('edit_book', { data: rows });
    })
});

// Update book info
app.post('/update-book-form', function (req, res) {
    let data = req.body;
    let update_book = parseInt(data.book_id_update)

    let query1 = `UPDATE Books SET title = '${data['title_update']}', author = '${data['author_update']}', genre = '${data['genre_update']}', price = '${data['price_update']}', quantity_in_stock = '${data['quantity_in_stock_update']}' WHERE book_id = ${update_book};`;
    db.pool.query(query1, function (error, rows, fields) {
        let query2 = "SELECT * FROM Books;";
        db.pool.query(query2, function (error, rows, fields) {
            res.render('books', { data: rows });
        })
    })
});


// Delete book
app.post('/delete-book-form', function (req, res) {
    let data = req.body;
    let delete_book = parseInt(data.book_id_selected)

    let query1 = `DELETE FROM Books WHERE book_id = ${delete_book};`;
    db.pool.query(query1, function (error, rows, fields) {
        let query2 = "SELECT * FROM Books;";
        db.pool.query(query2, function (error, rows, fields) {
            res.render('books', { data: rows });
        })
    })
});

/* Orders */
// Show all orders
app.get('/orders', function (req, res) {
    let query1 = "SELECT o.order_number AS order_number, o.customer_id AS customer_id, c.first_name AS c_first_name, c.last_name AS c_last_name, o.employee_id AS employee_id, e.first_name AS e_first_name, e.last_name AS e_last_name, o.order_date AS order_date, o.order_complete AS order_complete, o.to_be_shipped AS to_be_shipped FROM ((Orders o INNER JOIN Customers c ON o.customer_id = c.customer_id) LEFT JOIN Employees e ON o.employee_id = e.employee_id);";

    db.pool.query(query1, function (error, rows, fields) {    // Execute the query

        res.render('orders', { data: rows });                 // Render the orders.hbs file, and also send the renderer
    })                                                      // an object where 'data' is equal to the 'rows' we
});                                                         // received back from the query

// Show Orders search results
app.post('/search-orders-form', function (req, res) {
    let data = req.body;
    let search_order = parseInt(data.order_number_entered)
    let query1 = `SELECT o.order_number AS order_number, o.customer_id AS customer_id, c.first_name AS c_first_name, c.last_name AS c_last_name, o.employee_id AS employee_id, e.first_name AS e_first_name, e.last_name AS e_last_name, o.order_date AS order_date, o.order_complete AS order_complete, o.to_be_shipped AS to_be_shipped FROM ((Orders o INNER JOIN Customers c ON o.customer_id = c.customer_id) LEFT JOIN Employees e ON o.employee_id = e.employee_id) WHERE o.order_number = ${search_order};`;
    db.pool.query(query1, function (error, rows, fields) {

        res.render('orders', { data: rows });
    })
});

// Add new order page    
app.get('/new_order', function (req, res) {
    // Get the values for drop-down menus
    query1 = `SELECT * FROM Customers;`;
    query2 = `SELECT * FROM Employees;`;
    query3 = `SELECT * FROM Books;`;

    db.pool.query(query1, function (error, rows, fields) {
        let select_customers = rows;

        db.pool.query(query2, function (error, rows, fields) {
            let select_employees = rows;

            db.pool.query(query3, function (error, rows, fields) {
                let select_books = rows;

                res.render('new_order', { select_customers: select_customers, select_employees: select_employees, select_books: select_books });
            })
        })
    })
});

// Add a new order
app.post('/new-order-form', function (req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    let employee_id = parseInt(data['employee_id_input']);
    if (isNaN(employee_id)) {
        employee_id = 'NULL'
    }

    // Create the query and run it on the database
    query1 = `INSERT INTO Orders (customer_id, employee_id, order_date, order_complete, to_be_shipped) VALUES ('${data['customer_id_input']}', ${employee_id}, '${data['order_date_input']}', ${data['order_complete_input']}, ${data['to_be_shipped_input']})`;
    query2 = `SELECT max(order_number) as max_order_number FROM Orders`;

    db.pool.query(query1, function (error, rows, fields) {

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        else {
            db.pool.query(query2, function (error, rows, fields) {
                let result = JSON.parse(JSON.stringify(rows))
                new_order_number = result[0].max_order_number

                query3 = `INSERT INTO Order_items (order_number, book_id, quantity, order_item_complete) VALUES (${new_order_number}, '${data['book_id_input']}', '${data['quantity_input']}', ${data['order_item_complete_input']})`;

                db.pool.query(query3, function (error, rows, fields) {

                    // Check to see if there was an error
                    if (error) {

                        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                        console.log(error)
                        res.sendStatus(400);
                    }

                    // If there was no error, we redirect back to our Orders page
                    else {
                        let query4 = `SELECT o.order_number AS order_number, o.customer_id AS customer_id, c.first_name AS c_first_name, c.last_name AS c_last_name, o.employee_id AS employee_id, e.first_name AS e_first_name, e.last_name AS e_last_name, o.order_date AS order_date, o.order_complete AS order_complete, o.to_be_shipped AS to_be_shipped FROM ((Orders o INNER JOIN Customers c ON o.customer_id = c.customer_id) LEFT JOIN Employees e ON o.employee_id = e.employee_id);`;
                        db.pool.query(query4, function (error, rows, fields) {
                            res.render('orders', { data: rows });
                        })
                    }
                })
            })
        }
    })
})

// Edit order page    
app.get('/edit_order', function (req, res) {
    res.render('edit_order');
});

// Delete Order
app.post('/delete-order-form', function (req, res) {
    let data = req.body;
    let delete_order = parseInt(data.order_number_selected)

    let query1 = `DELETE FROM Orders WHERE order_number = ${delete_order};`;
    db.pool.query(query1, function (error, rows, fields) {
        let query2 = "SELECT o.order_number AS order_number, o.customer_id AS customer_id, c.first_name AS c_first_name, c.last_name AS c_last_name, o.employee_id AS employee_id, e.first_name AS e_first_name, e.last_name AS e_last_name, o.order_date AS order_date, o.order_complete AS order_complete, o.to_be_shipped AS to_be_shipped FROM ((Orders o INNER JOIN Customers c ON o.customer_id = c.customer_id) LEFT JOIN Employees e ON o.employee_id = e.employee_id);";
        db.pool.query(query2, function (error, rows, fields) {
            res.render('orders', { data: rows });
        })
    })
});

/* Order Items */
// Show all order items
app.get('/order_items', function (req, res) {
    let query1 = "SELECT oi.order_number AS order_number, oi.book_id AS book_id, b.title AS title, oi.quantity AS quantity, oi.order_item_complete AS order_item_complete FROM (Order_items oi LEFT JOIN Books b ON oi.book_id = b.book_id); ";

    db.pool.query(query1, function (error, rows, fields) {    // Execute the query

        res.render('order_items', { data: rows });            // Render the order_items.hbs file, and also send the renderer
    })                                                        // an object where 'data' is equal to the 'rows' we
});

// Show order items search results
app.post('/search-order-items-form', function (req, res) {
    let data = req.body;
    let query1 = `SELECT oi.order_number AS order_number, oi.book_id AS book_id, b.title AS title, oi.quantity AS quantity, oi.order_item_complete AS order_item_complete FROM (Order_items oi LEFT JOIN Books b ON oi.book_id = b.book_id) WHERE order_number = '${data['order_number_entered']}';`;
    db.pool.query(query1, function (error, rows, fields) {

        res.render('order_items', { data: rows });
    })
});

// Add items to an order
app.post('/add-order-items-form', function (req, res) {
    let data = req.body;
    let order_number = parseInt(data['order_number_selected']);

    let query1 = `SELECT * FROM Books;`
    db.pool.query(query1, function (error, rows, fields) {
        let select_books = rows;
        res.render('add_order_items', { select_books: select_books, order_number: order_number });
    })
});

// Update order items
app.post('/update-order-items-form', function (req, res) {
    let data = req.body;
    let update_order = parseInt(data.order_number_update)
    let update_book = parseInt(data.book_id_input)
    let update_book_2 = parseInt(data.book_id_input_2)
    let update_quantity_2 = parseInt(data.quantity_input_2)
    let update_book_3 = parseInt(data.book_id_input_3)
    let update_quantity_3 = parseInt(data.quantity_input_3)


    let query1 = `INSERT INTO Order_items (order_number, book_id, quantity, order_item_complete) VALUES (${update_order}, ${update_book}, '${data['quantity_input']}', ${data['order_item_complete_input']})`;
    let query2 = `INSERT INTO Order_items (order_number, book_id, quantity, order_item_complete) VALUES (${update_order}, ${update_book_2}, '${data['quantity_input_2']}', ${data['order_item_complete_input_2']})`;
    let query3 = `INSERT INTO Order_items (order_number, book_id, quantity, order_item_complete) VALUES (${update_order}, ${update_book_3}, '${data['quantity_input_3']}', ${data['order_item_complete_input_3']})`;


    db.pool.query(query1, function (error, rows, fields) {
        if (!isNaN(update_book_2) && !isNaN(update_quantity_2)) {
            db.pool.query(query2, function (error, rows, fields) {
                if (!isNaN(update_book_3) && !isNaN(update_quantity_3)) {
                    db.pool.query(query3, function (error, rows, fields) {
                    })
                }
            })
        }
        let query4 = `SELECT oi.order_number AS order_number, oi.book_id AS book_id, b.title AS title, oi.quantity AS quantity, oi.order_item_complete AS order_item_complete FROM (Order_items oi LEFT JOIN Books b ON oi.book_id = b.book_id) WHERE order_number = '${data['order_number_update']}';`;
        db.pool.query(query4, function (error, rows, fields) {

            res.render('order_items', { data: rows });
        })
    })
});

// Edit order item page    
app.get('/edit_order_item', function (req, res) {
    res.render('edit_order_item');
});

// Delete Order_item
app.post('/delete-order-item-form', function (req, res) {
    let data = req.body;
    let delete_order_item = data.order_item_selected.split(',')

    let order_number_selected = parseInt(delete_order_item[0])
    let book_id_selected = parseInt(delete_order_item[1])

    let query1 = `DELETE FROM Order_items WHERE order_number = ${order_number_selected} AND book_id = ${book_id_selected};`;
    db.pool.query(query1, function (error, rows, fields) {
        let query3 = `SELECT * FROM Order_items WHERE order_number = ${order_number_selected};`;
        db.pool.query(query3, function (error, rows, fields) {
            if (rows.length == 0) {
                let query4 = `DELETE FROM Orders WHERE order_number = ${order_number_selected};`;
                db.pool.query(query4, function (error, rows, fields) {
                    let query5 = "SELECT o.order_number AS order_number, o.customer_id AS customer_id, c.first_name AS c_first_name, c.last_name AS c_last_name, o.employee_id AS employee_id, e.first_name AS e_first_name, e.last_name AS e_last_name, o.order_date AS order_date, o.order_complete AS order_complete, o.to_be_shipped AS to_be_shipped FROM ((Orders o INNER JOIN Customers c ON o.customer_id = c.customer_id) LEFT JOIN Employees e ON o.employee_id = e.employee_id);";
                    db.pool.query(query5, function (error, rows, fields) {
                        res.render('orders', { data: rows });
                    })
                })
            } else {
                let query2 = `SELECT oi.order_number AS order_number, oi.book_id AS book_id, b.title AS title, oi.quantity AS quantity, oi.order_item_complete AS order_item_complete FROM (Order_items oi LEFT JOIN Books b ON oi.book_id = b.book_id) WHERE order_number = ${order_number_selected}; `;
                db.pool.query(query2, function (error, rows, fields) {
                    res.render('order_items', { data: rows });
                })
            }
        })
    })
});

/* Employees */
// Show all employees
app.get('/employees', function (req, res) {
    let query1 = "SELECT * FROM Employees;";                // Define our query

    db.pool.query(query1, function (error, rows, fields) {    // Execute the query

        res.render('employees', { data: rows });              // Render the employees.hbs file, and also send the renderer
    })                                                      // an object where 'data' is equal to the 'rows' we
});                                                         // received back from the query

// Show employees search results
app.post('/search-employees-form', function (req, res) {
    let data = req.body;
    let query1 = `SELECT * FROM Employees WHERE first_name = '${data['first_name_entered']}' OR last_name = '${data['last_name_entered']}';`;
    db.pool.query(query1, function (error, rows, fields) {

        res.render('employees', { data: rows });
    })
});

// Add new employee page    
app.get('/new_employee', function (req, res) {
    res.render('new_employee');
});

// Add a new employee
app.post('/new-employee-form', function (req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Employees (first_name, last_name) VALUES ('${data['first_name_input']}', '${data['last_name_input']}')`;
    db.pool.query(query1, function (error, rows, fields) {

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our Employees page
        else {
            let query1 = "SELECT * FROM Employees;";
            db.pool.query(query1, function (error, rows, fields) {
                res.render('employees', { data: rows });
            })
        }
    })
})

// Edit employee page  
// Populate fields for editing  
app.post('/edit-employee-form', function (req, res) {
    let data = req.body;
    let update_employee = parseInt(data.edit_employee_id_selected)

    let query1 = `SELECT employee_id, first_name, last_name FROM Employees WHERE employee_id = ${update_employee};`;
    db.pool.query(query1, function (error, rows, fields) {
        res.render('edit_employee', { data: rows });
    })
});

// Update employee info
app.post('/update-employee-form', function (req, res) {
    let data = req.body;
    let update_employee = parseInt(data.employee_id_update)

    let query1 = `UPDATE Employees SET first_name = '${data['first_name_update']}', last_name = '${data['last_name_update']}' WHERE employee_id = ${update_employee};`;
    db.pool.query(query1, function (error, rows, fields) {
        let query2 = "SELECT * FROM Employees;";
        db.pool.query(query2, function (error, rows, fields) {
            res.render('employees', { data: rows });
        })
    })
});


// Delete employee
app.post('/delete-employee-form', function (req, res) {
    let data = req.body;
    let delete_employee = parseInt(data.employee_id_selected)

    let query1 = `DELETE FROM Employees WHERE employee_id = ${delete_employee};`;
    db.pool.query(query1, function (error, rows, fields) {
        let query2 = "SELECT * FROM Employees;";
        db.pool.query(query2, function (error, rows, fields) {
            res.render('employees', { data: rows });
        })
    })
});

/*
    LISTENER
*/
app.listen(PORT, function () {            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on flip2.engr.oregonstate.edu:' + PORT + '; press Ctrl-C to terminate.')
});