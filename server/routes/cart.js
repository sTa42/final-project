const express = require("express");
const router = express.Router();
const { getProductDataById } = require("../middlewares/db");

router.get("/content.json", (req, res) => {
    if (req.session.cart) {
        res.json({ success: true, cart: req.session.cart });
    } else {
        res.json({ success: false });
    }
});
router.get("/view.json", async (req, res) => {
    try {
        console.log(req.session.cart);
        const cart = req.session.cart;
        const promises = [];

        for (const item in cart) {
            promises.push(getProductDataById(item));
        }
        const data = await Promise.all(promises);
        const items = data.map(({ rows: [item] }) => {
            item.amount = cart[item.id].amount;
            return item;
        });

        res.json({
            success: true,
            items,
        });
    } catch (err) {
        console.log("ERROR GETTING PRODUCT DATA FOR CART DISPLAY: ", err);
        res.json({ success: false, message: "server error" });
    }
});

// change to post later
router.post("/empty", (req, res) => {
    req.session.cart = {};
    res.json({ success: true, message: "emptied" });
});
router.post("/additem", (req, res) => {
    if (!Object.hasOwn(req.session, "cart")) {
        req.session.cart = {};
    }
    const item = req.body.item;
    if (Object.hasOwn(req.session.cart, item)) {
        console.log(
            "Product ID: ",
            item,
            " has an amount of: ",
            req.session.cart[item].amount
        );
        req.session.cart[item].amount++;
        res.json({ success: true, message: "increased", item });
    } else {
        req.session.cart = { ...req.session.cart, [item]: { amount: 1 } };
        res.json({ success: true, message: "added", item });
    }
});
router.post("/removeitem", (req, res) => {
    const item = req.body.item;
    if (Object.hasOwn(req.session.cart, item)) {
        delete req.session.cart[item];
        res.json({ success: true, message: "removed", item });
    } else {
        res.json({ success: false });
    }
});
router.post("/decreaseitemamount", (req, res) => {
    const item = req.body.item;
    if (Object.hasOwn(req.session.cart, item)) {
        if (req.session.cart[item].amount > 1) {
            req.session.cart[item].amount--;
            res.json({ success: true, message: "decreased", item });
        } else if (req.session.cart[item].amount == 1) {
            delete req.session.cart[item];
            res.json({ success: true, message: "removed", item });
        }
    } else {
        res.json({ success: false });
    }
});
module.exports = router;
