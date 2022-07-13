CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  firstname VARCHAR(100) NOT NULL,
  lastname VARCHAR(100) NOT NULL,
  username VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(128) NOT NULL
);

INSERT INTO users (firstname, lastname, username, password)
VALUES
 ('First', 'Dummy', 'user', 'password');
