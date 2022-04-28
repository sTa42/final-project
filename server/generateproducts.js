// import { faker } from "@faker-js/faker";
const { faker } = require("@faker-js/faker");
const { addProduct } = require("./middlewares/db");

function addProducts(amount) {
    for (let i = 0; i < amount; i++) {
        const produtName = faker.commerce.productName();
        const description = faker.commerce.productDescription();
        const price = faker.finance.amount(0.01, 100, 2);
        // const image =
        addProduct(produtName, description, price);
    }
}

addProducts(20);
