DROP TABLE IF EXISTS products;
CREATE TABLE products (
    id SERIAL primary key,
    name VARCHAR(255) NOT NULL CHECK (name != ''),
    description TEXT,
    price NUMERIC(10,2) NOT NULL,
    picture_url VARCHAR
);