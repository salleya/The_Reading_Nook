-- Dana Yarges
-- Amy Salley
-- CS340
-- Project Step 4: This file contains the Data Definition Queries for the database.

-- Data Definition - Create Entity Tables
DROP TABLE IF EXISTS `Order_items`;
DROP TABLE IF EXISTS `Orders`;
DROP TABLE IF EXISTS `Customers`;
DROP TABLE IF EXISTS `Books`;
DROP TABLE IF EXISTS `Employees`;


CREATE TABLE `Customers` (
`customer_id` int(11) UNIQUE NOT NULL AUTO_INCREMENT,
`first_name` varchar(255) NOT NULL,
`last_name` varchar(255) NOT NULL,
`email` varchar(255),
`street_address` varchar(255),
`city` varchar(255),
`state` varchar(255),
`zip_code` varchar(255),
PRIMARY KEY (`customer_id`)
) ENGINE=InnoDB;

CREATE TABLE `Books` (
`book_id` int(11) UNIQUE NOT NULL AUTO_INCREMENT,
`title` varchar(255) NOT NULL,
`author` varchar(255) NOT NULL,
`genre` varchar(255),
`price` decimal(6,2) UNSIGNED NOT NULL,
`quantity_in_stock` int(11) UNSIGNED NOT NULL,
PRIMARY KEY (`book_id`)
) ENGINE=InnoDB;

CREATE TABLE `Employees` (
`employee_id` int(11) UNIQUE NOT NULL AUTO_INCREMENT,
`first_name` varchar(255) NOT NULL,
`last_name` varchar(255) NOT NULL,
PRIMARY KEY (`employee_id`)
) ENGINE=InnoDB;

CREATE TABLE `Orders` (
`order_number` int(11) NOT NULL AUTO_INCREMENT,
`customer_id` int(11) NOT NULL,
`employee_id` int(11),
`order_date` date,
`order_complete` boolean NOT NULL,
`to_be_shipped` boolean NOT NULL,
CONSTRAINT `Orders_fk_1` FOREIGN KEY (`customer_id`) REFERENCES `Customers` (`customer_id`) ON DELETE CASCADE,
CONSTRAINT `Orders_fk_2` FOREIGN KEY (`employee_id`) REFERENCES `Employees` (`employee_id`) ON DELETE SET NULL,
PRIMARY KEY (`order_number`)
) ENGINE=InnoDB;

CREATE TABLE `Order_items` (
`order_number` int(11) NOT NULL,
`book_id` int(11) NOT NULL,
`quantity` int(11) UNSIGNED NOT NULL,
`order_item_complete` boolean NOT NULL,
FOREIGN KEY (`order_number`) REFERENCES `Orders` (`order_number`) ON DELETE CASCADE,
FOREIGN KEY (`book_id`) REFERENCES `Books` (`book_id`) ON DELETE CASCADE,
PRIMARY KEY (`order_number`, `book_id`)
) ENGINE=InnoDB;


-- Sample Data - Populate Entity Tables
-- Books
INSERT INTO `Books` (title, author, genre, price, quantity_in_stock) VALUES ("Harry Potter and the Sorcerer's Stone", "J.K. Rowling", "Fantasy Fiction", 8.99, 5);

INSERT INTO `Books` (title, author, genre, price, quantity_in_stock) VALUES ("Harry Potter and the Chamber of Secrets", "J.K. Rowling", "Fantasy Fiction", 9.99, 6);

INSERT INTO `Books` (title, author, genre, price, quantity_in_stock) VALUES ("Harry Potter and the Prisoner of Azkaban", "J.K. Rowling", "Fantasy Fiction", 9.99, 7);

INSERT INTO `Books` (title, author, genre, price, quantity_in_stock) VALUES ("Harry Potter and the Goblet of Fire", "J.K. Rowling", "Fantasy Fiction", 12.99, 7);

INSERT INTO `Books` (title, author, genre, price, quantity_in_stock) VALUES ("Harry Potter and the Order of the Phoenix", "J.K. Rowling", "Fantasy Fiction", 12.99, 3);

INSERT INTO `Books` (title, author, genre, price, quantity_in_stock) VALUES ("Harry Potter and the Half Blood Prince", "J.K. Rowling", "Fantasy Fiction", 12.99, 5);

INSERT INTO `Books` (title, author, genre, price, quantity_in_stock) VALUES ("Harry Potter and the Deathly Hallows", "J.K. Rowling", "Fantasy Fiction", 14.99, 5);

INSERT INTO `Books` (title, author, genre, price, quantity_in_stock) VALUES ("The Boys In the Boat", "Daniel Brown", "Biography", 15.99, 3);

INSERT INTO `Books` (title, author, genre, price, quantity_in_stock) VALUES ("The Davinci Code", "Dan Brown", "Mystery", 15.95, 3);

INSERT INTO `Books` (title, author, genre, price, quantity_in_stock) VALUES ("Dark Matter and the Dinosaurs", "Linda Randall", "Non-fiction", 15.95, 1);

INSERT INTO `Books` (title, author, genre, price, quantity_in_stock) VALUES ("The Giver", "Lois Lowry", "Science Fiction", 9.99, 2);

INSERT INTO `Books` (title, author, genre, price, quantity_in_stock) VALUES ("Relational Database Design and Implementation: Clearly Explained", "Jan Harrington", "Non-fiction", 25.50, 3);

INSERT INTO `Books` (title, author, genre, price, quantity_in_stock) VALUES ("Beloved", "Toni Morrison", "American Literature", 14.99, 6);

INSERT INTO `Books` (title, author, genre, price, quantity_in_stock) VALUES ("The Count of Monte Cristo", "Alexandre Dumas", "Historical novel", 11.99, 4);

-- Employees
INSERT INTO `Employees` (first_name, last_name) VALUES ("Mary", "Randell");

INSERT INTO `Employees` (first_name, last_name) VALUES ("Molly", "Jewell");

INSERT INTO `Employees` (first_name, last_name) VALUES ("Arianna", "Welch");

INSERT INTO `Employees` (first_name, last_name) VALUES ("Brandon", "Haywood");

INSERT INTO `Employees` (first_name, last_name) VALUES ("Greg", "Windsor");

INSERT INTO `Employees` (first_name, last_name) VALUES ("Devin", "Bell");

-- Customers
INSERT INTO `Customers` (first_name, last_name, email, street_address, city, state, zip_code) VALUES ("Marvin", "Crenshaw", "marvincrenshaw@email.com", "11223 W Oak St.", "Akron", "OH", "45231" );

INSERT INTO `Customers` (first_name, last_name, email, street_address, city, state, zip_code) VALUES ("Evelyn", "Geary", "egeary@email.com", "365 SE Maple St.", "Milwaukee", "WI", "74582" );

INSERT INTO `Customers` (first_name, last_name, email) VALUES ("James", "Cason", "jcason@email.com");

INSERT INTO `Customers` (first_name, last_name) VALUES ("Diana", "Roderick");

INSERT INTO `Customers` (first_name, last_name) VALUES ("Cameron", "Reader");

INSERT INTO `Customers` (first_name, last_name, email, street_address, city, state, zip_code) VALUES ("Juan", "Tello", "tello@email.com", "123 Main St.", "Atlanta", "GA", "31099" );

INSERT INTO `Customers` (first_name, last_name, email) VALUES ("Jun", "Kim", "junkim@email.com");

-- Orders
INSERT INTO `Orders` (customer_id, order_date, order_complete, to_be_shipped) VALUES (1, "2022-02-22", FALSE, TRUE);

INSERT INTO `Orders` (customer_id, order_date, order_complete, to_be_shipped) VALUES (2, "2022-01-19", TRUE, TRUE);

INSERT INTO `Orders` (customer_id, employee_id, order_date, order_complete, to_be_shipped) VALUES (4, 1, "2021-12-15", TRUE, FALSE);

INSERT INTO `Orders` (customer_id, employee_id, order_date, order_complete, to_be_shipped) VALUES (5, 4, "2021-12-10", TRUE, FALSE);

INSERT INTO `Orders` (customer_id, employee_id, order_date, order_complete, to_be_shipped) VALUES (7, 3, "2022-03-09", FALSE, TRUE);

INSERT INTO `Orders` (customer_id, order_date, order_complete, to_be_shipped) VALUES (6, "2022-01-15", FALSE, TRUE);


-- Order_items
INSERT INTO `Order_items` (order_number, book_id, quantity, order_item_complete) VALUES (1, 1, 1, FALSE);

INSERT INTO `Order_items` (order_number, book_id, quantity, order_item_complete) VALUES (1, 11, 1, FALSE);

INSERT INTO `Order_items` (order_number, book_id, quantity, order_item_complete) VALUES (1, 12, 1, FALSE);

INSERT INTO `Order_items` (order_number, book_id, quantity, order_item_complete) VALUES (2, 4, 3, TRUE);

INSERT INTO `Order_items` (order_number, book_id, quantity, order_item_complete) VALUES (3, 9, 2, TRUE);

INSERT INTO `Order_items` (order_number, book_id, quantity, order_item_complete) VALUES (4, 6, 1, TRUE);

INSERT INTO `Order_items` (order_number, book_id, quantity, order_item_complete) VALUES (4, 7, 1, TRUE);

INSERT INTO `Order_items` (order_number, book_id, quantity, order_item_complete) VALUES (5, 13, 1, FALSE);

INSERT INTO `Order_items` (order_number, book_id, quantity, order_item_complete) VALUES (6, 14, 1, FALSE);

INSERT INTO `Order_items` (order_number, book_id, quantity, order_item_complete) VALUES (6, 8, 1, FALSE);