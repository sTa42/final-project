DROP TABLE IF EXISTS users;
CREATE TABLE users (
    id SERIAL primary key,
    user_id INTEGER NOT NULL REFERENCES users(id),
    street VARCHAR(255) NOT NULL,
    zipcode INT NOT NULL,
    city VARCHAR(255) NOT NULL,
    );