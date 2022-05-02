const express = require("express");
const router = express.Router();

router.get("/content.json", (req, res) => {
    if (req.session.cart) {
        res.json({ success: true, cart: req.session.cart });
    } else {
        res.json({ success: false });
    }
});

// change to post later
router.get("/empty", (req, res) => {
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
