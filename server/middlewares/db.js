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
        `SELECT id, firstname, lastname FROM users WHERE id = $1;`,
        [id]
    );
};
exports.getUserInfoByEmail = (email) => {
    return db.query(`SELECT * FROM users WHERE email=$1;`, [email]);
};

exports.getProductsBySearch = (searchTerm) => {
    return db.query(`SELECT * FROM products WHERE (name ILIKE $1);`, [
        searchTerm + "%",
    ]);
};
exports.addProduct = (name, description, price) => {
    return db.query(
        `INSERT INTO products (name, description, price) VALUES ($1, $2, $3)`,
        [name, description, price]
    );
};
exports.getAllProducts = () => {
    return db.query(`SELECT * FROM products;`);
};
exports.getProductDataById = (id) => {
    return db.query(`SELECT * FROM products WHERE id = $1`, [id]);
};
