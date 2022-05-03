const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL ||
        `postgres:postgres:postgres@localhost:5432/onlineshop`
);

exports.registerUser = (firstname, lastname, email, password) => {
    return db.query(
        `INSERT INTO users (firstname, lastname, email, password) 
        VALUES ($1,$2,$3,$4)
        RETURNING id;`,
        [firstname, lastname, email, password]
    );
};
exports.getBasicUserData = (id) => {
    return db.query(
        `SELECT id, firstname, lastname, email, created_at FROM users WHERE id = $1;`,
        [id]
    );
};
exports.getUserInfoByEmail = (email) => {
    return db.query(`SELECT * FROM users WHERE email=$1;`, [email]);
};

exports.getProductsBySearch = (searchTerm) => {
    return db.query(`SELECT * FROM products WHERE (name ILIKE $1);`, [
        "%" + searchTerm + "%",
    ]);
};
exports.addProduct = (name, description, price) => {
    return db.query(
        `INSERT INTO products (name, description, price) VALUES ($1, $2, $3)`,
        [name, description, price]
    );
};

exports.getRandomProducts = () => {
    return db.query(`SELECT * FROM products ORDER BY RANDOM() LIMIT 4`);
};
exports.getAllProducts = () => {
    return db.query(`SELECT * FROM products;`);
};
exports.getProductDataById = (id) => {
    return db.query(`SELECT * FROM products WHERE id = $1`, [id]);
};
exports.getProductPriceDataById = (id) => {
    return db.query(`SELECT price, id FROM products WHERE id = $1`, [id]);
};

exports.getAllOrdersForUser = (id) => {
    return db.query(
        `SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC;`,
        [id]
    );
};
exports.getOrderContent = (id) => {
    return db.query(
        `SELECT products.name, products.price, products.id, orders_content.amount, products.picture_url 
        FROM orders_content 
        JOIN products 
        ON orders_content.item_id = products.id 
        WHERE orders_content.order_id = $1;`,
        [id]
    );
};
exports.getOrder = (order_id, user_id) => {
    return db.query(
        `SELECT * FROM orders WHERE order_id = $1 AND user_id = $2;`,
        [order_id, user_id]
    );
};
exports.updateTotalCostInOrders = (orderId, cost) => {
    return db.query(
        `UPDATE orders 
        SET totalcost = $2 
        WHERE order_id = $1 RETURNING *;`,
        [orderId, cost]
    );
};
exports.createOrder = (order_id, user_id) => {
    return db.query(
        `INSERT INTO orders (order_id, user_id, status) VALUES ($1, $2, 'ORDERED') RETURNING *`,
        [order_id, user_id]
    );
};
exports.updateOrderWithPrice = (order_id, totalcost) => {
    return db.query(`UPDATE orders SET totalcost = $2 WHERE order_id = $1;`, [
        order_id,
        totalcost,
    ]);
};
exports.createOrdersContentEntryForOrder = (order_id, item_id, amount) => {
    return db.query(
        `INSERT INTO orders_content (order_id, item_id, amount) VALUES ($1, $2, $3) RETURNING *`,
        [order_id, item_id, amount]
    );
};

exports.getAllAddresses = (id) => {
    return db.query(`SELECT * FROM addresses WHERE user_id = $1;`, [id]);
};

exports.addAddress = (user_id, street, zipcode, city) => {
    return db.query(
        `INSERT INTO addresses (user_id, street, zipcode, city) VALUES ($1, $2, $3, $4) RETURNING *;`,
        [user_id, street, zipcode, city]
    );
};
exports.removeAdress = (user_id, address_id) => {
    return db.query(
        `DELETE FROM addresses WHERE user_id = $1 AND id = $2 RETURNING id;`,
        [user_id, address_id]
    );
};
