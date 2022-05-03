DROP TABLE IF EXISTS orders CASCADE;
CREATE TABLE orders (
    user_id INTEGER NOT NULL REFERENCES users(id),
    order_id VARCHAR UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(10) NOT NULL,
    totalcost NUMERIC(10,2)
);




-- INSERT INTO orders (user_id, order_id, status, totalcost) VALUES (21, '1', 'ORDERED', 74.93);
-- INSERT INTO orders (user_id, order_id, status, totalcost) VALUES (21, '2', 'ORDERED', 142.43);
-- INSERT INTO orders (user_id, order_id, status, totalcost) VALUES (21, '3', 'ORDERED', 500.13);