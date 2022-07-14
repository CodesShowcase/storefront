# API and Database Schema
Here you will find an outline of the API Endpoints and the Database Schema

## API Endpoints

- "/orders" [!]: GET will return all orders
- "/orders/:userid" [!]: GET will return all orders for a specific user
- "/orders" [!]: POST will add a new order
- "/orders" [!]: DELETE will delete a specific order
- "/orders/items/:orderid" [!]: GET will return all items for a specific order
- "/orders/items" [!]: POST will add a new order items to an order
- "/orders/items" [!]: DELETE will delete specific items

- "/products": GET will return all products
- "/products/:id": GET will return a specific product
- "/products" [!]: POST will add a new product
- "/products" [!]: DELETE will delete a specific product

- "/users" [!]: GET will return all users
- "/users/:id"  [!]: GET will return a specific user
- "/users": POST will add a new user
- "/users" [!]: DELETE will delete a specific user
- "/users/login" [!]: POST will login a user

[!]: only possible with a valid token (created after creating a user or login)

## Database Schema

[!] The prepopulation is needed to satisfy the constraints in the tables.
It can be safely altered or removed (if the constraints are fulfilled).

- Table users

id SERIAL PRIMARY KEY,
firstname VARCHAR(100) NOT NULL,
lastname VARCHAR(100) NOT NULL,
username VARCHAR(100) NOT NULL UNIQUE,
password VARCHAR(128) NOT NULL

=> The table users is prepopulated with a dummy user
firstname: 'First' / lastname: 'Dummy' / username: 'user' / password: 'password'

- Table products

id SERIAL PRIMARY KEY,
name VARCHAR(100) NOT NULL,
price decimal(12,2) NOT NULL,
category_id INTEGER NOT NULL,
CONSTRAINT fk_category FOREIGN KEY(category_id) REFERENCES categories(id)

=> The table products is prepopulated with a dummy product
name: 'Dummy Product' / price: '9.99' / category_id: 1

=> category_id is a reference to the foreign key id from the table categories

- Table categories
! optional table - if not used category_id from products must be removed

id SERIAL PRIMARY KEY,
name VARCHAR(100) NOT NULL

=> The table categories is prepopulated with dummy categories
name: 'Vegetables' // name: 'Meat' // name: 'Fruits' // name: 'Deserts'

- Table orders

id SERIAL PRIMARY KEY,
user_id INTEGER NOT NULL,
status order_status NOT NULL,
CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id)

=> user_id is a reference to the foreign key id from the table users

- Table order_items

id SERIAL PRIMARY KEY,
order_id INTEGER NOT NULL,
product_id INTEGER NOT NULL,
quantity INTEGER NOT NULL,
CONSTRAINT fk_order FOREIGN KEY(order_id) REFERENCES orders(id),
CONSTRAINT fk_product FOREIGN KEY(product_id) REFERENCES products(id)

=> order_id is a reference to the foreign key id from the table orders
=> product_id is a reference to the foreign key id from the table products

This table is a one to many relationship (one order can have many order items) and
a one to one relationship (one order item consists of a product with a given quantity)
