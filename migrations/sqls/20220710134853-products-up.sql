CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  price decimal(12,2) NOT NULL,
  category_id INTEGER NOT NULL,
  CONSTRAINT fk_category FOREIGN KEY(category_id) REFERENCES categories(id)
);

INSERT INTO products (name, price, category_id)
VALUES
 ('Dummy Product', '9.99', 1);
