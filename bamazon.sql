DROP DATABASE IF EXISTS bamazon_db;
CREATE database bamazon_db;

USE bamazon_db;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price DOUBLE(11, 2) NOT NULL,
    stock_quantity INT NOT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES  ("tablet", "electronics", 399.00, 200),
        ("laptop", "electronics", 999.99, 100),
        ("Instant Ramen", "groceries", 1.99, 1000),
        ("hot chocolate mix", "groceries", 5.59, 538),
        ("Javascript Ninja", "books", 44.38, 23),
        ("Java: The Complete Reference", "books", 56.28, 54),
        ("CODE", "books", 15.35, 14),
        ("Cardigan", "Clothing", 25.50, 30),
        ("t-shirt", "Clothing", 10.99, 101),
        ("12-in non-stick pan", "Kitchen", 59.49, 60),
        ("Le Creuset 4 Quart Dutch Oven", "Kitchen", 399.00, 20);