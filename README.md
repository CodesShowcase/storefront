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

### Server

The server runs on port 3000 (usually localhost:3000), but first you must install all the required packages:

=> Run yarn install

Make sure you have Docker installed

=> docker compose -f docker-compose.yml up

alternatively you can use a local PostgreSQL install

Set up the databases

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
