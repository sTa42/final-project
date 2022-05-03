DROP TABLE IF EXISTS orders_content CASCADE;
CREATE TABLE orders_content (
    order_id VARCHAR REFERENCES orders(order_id),
    item_id INT REFERENCES products(id),
    amount INT NOT NULL
);


-- INSERT INTO orders_content (order_id, item_id, amount) VALUES (1,5, 3);
-- INSERT INTO orders_content (order_id, item_id, amount) VALUES (1,5, 2);
-- INSERT INTO orders_content (order_id, item_id, amount) VALUES (1,6, 4);
-- INSERT INTO orders_content (order_id, item_id, amount) VALUES (2,7, 1);
-- INSERT INTO orders_content (order_id, item_id, amount) VALUES (2,8, 1);
-- INSERT INTO orders_content (order_id, item_id, amount) VALUES (3,9, 2);