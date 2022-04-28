DROP TABLE IF EXISTS orders_content;
CREATE TABLE orders_content (
    order_id VARCHAR REFERENCES orders(order_id),
    item_id INT REFERENCES products(id),
    amount INT NOT NULL
);