DROP TABLE IF EXISTS addresses;
CREATE TABLE addresses (
    id SERIAL primary key,
    user_id INTEGER NOT NULL REFERENCES users(id),
    street VARCHAR(255) NOT NULL,
    zipcode INT NOT NULL,
    city VARCHAR(255) NOT NULL
    );

INSERT INTO addresses (user_id, street, zipcode, city) VALUES (27,'Werner Street 12', 49213, 'Uulum');
INSERT INTO addresses (user_id, street, zipcode, city) VALUES (27,'Ogggg Street 12', 12346, 'Faaaan');
INSERT INTO addresses (user_id, street, zipcode, city) VALUES (27,'Berlin Street 12', 74322, 'Bumbum');
