# Storefront Backend Project

## Getting Started

As soon as you get started on this - you are doomed ;-)!

## Required Technologies

You need a server (PostgreSQL) with one database for developing and one for testing

- just use the provided docker-compose.yml

  - there is also a pgAdmin included (localhost:12080 | user: storefront@storefront.com / password: storefront)

- The whole project is basically configured via a .env file (which is not included) with the following settings:

BCRYPT_SALT=storefront  
SALT_ROUNDS=10  
EXPRESS_PORT=3000  
JWT_SECRET=storefront  
POSTGRES_DB=storefront  
POSTGRES_DB_TEST=storefront_test  
POSTGRES_USER=storefront  
POSTGRES_PASSWORD=storefront  
POSTGRES_PORT=5432  

But feel free to adjust them to your needs!


## Running

### Database

You can either use the docker-compose.yml in connection with the provided docker_postgres_init.sql and an .env file with the settings above (recommended way - see topic server below). In this case Docker will automatically setup the databases for you.

Alternatively you can also setup the databases yourself (e.g. you already have a local Postgres Server). In this case you need do the SQL queries yourself.

Database:  
=> CREATE DATABASE storefront; CREATE DATABASE storefront_test;

User:  
=> CREATE USER storefront WITH ENCRYPTED PASSWORD 'storefront';

Assign privileges:  
=> GRANT ALL PRIVILEGES ON DATABASE storefront TO storefront; GRANT ALL PRIVILEGES ON DATABASE storefront_test TO storefront;

After this you have to run "yarn migrate-up" to populate the databases (see topic server below).

### Server

The server runs on port 3000 (usually localhost:3000), but first you must install all the required packages:

=> Run yarn install

Make sure you have Docker installed

=> docker compose -f docker-compose.yml up

alternatively you can use a local PostgreSQL install

Set up the databases (see topic database above)

=> yarn migrate-up

Fire up your server

=> yarn start or yarn watch

Then you should be able to access the API via localhost:3000

### Scripts

- yarn install: install the required modules
- yarn start: compile Typescript and start the server
- yarn watch: development, compile Typescript and automatically update the server
- yarn test: testing, reset database (test), compile and run tests
- yarn migrate-up: run the migrations for development
- yarn migrate-down: reset the development databases
- yarn lint: Linting
- yarn prettier: Prettyfying
- yarn tsc: compiling Typescript


### API Endpoints

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

### Database Schema

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
