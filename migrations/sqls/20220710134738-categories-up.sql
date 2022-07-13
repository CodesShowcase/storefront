CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

INSERT INTO categories (name)
VALUES
 ('Vegetables'),
 ('Meat'),
 ('Fruits'),
 ('Deserts');
