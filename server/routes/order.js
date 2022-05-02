const express = require("express");
const router = express.Router();
const {
    getOrder,
    getAllOrdersForUser,
    getOrderContent,
    getProductPriceDataById,
    createOrder,
    updateOrderWithPrice,
    createOrdersContentEntryForOrder,
} = require("../middlewares/db");
const crypto = require("crypto");

router.get("/all.json", async (req, res) => {
    try {
        const { rows: orders } = await getAllOrdersForUser(req.session.userId);
        res.json({ success: true, orders });
    } catch (err) {
        console.log(err);
        res.json({ success: false, message: "server error" });
    }
});
router.get("/create", async (req, res) => {
    if (req.session.cart) {
        console.log(req.session.cart);

        const order_id = crypto.randomUUID();
        try {
            const promises = [];
            for (const id in req.session.cart) {
                promises.push(getProductPriceDataById(id));
            }
            const {
                rows: [order],
            } = await createOrder(order_id, req.session.userId);
            console.log(order);
            const prices = await Promise.all(promises);
            let totalprice = 0;
            const promisesInsert = [];
            for (let i = 0; i < prices.length; i++) {
                // console.log(data[i]);
                totalprice +=
                    prices[i].rows[0].price *
                    req.session.cart[prices[i].rows[0].id].amount;

                console.log("id: ", prices[i].rows[0].id);
                console.log("price: ", prices[i].rows[0].price);
                console.log(
                    "amount: ",
                    req.session.cart[prices[i].rows[0].id].amount
                );
                promisesInsert.push(
                    createOrdersContentEntryForOrder(
                        order_id,
                        prices[i].rows[0].id,
                        req.session.cart[prices[i].rows[0].id].amount
                    )
                );
            }

            await Promise.all(
                [
                    promisesInsert,
                    updateOrderWithPrice(order_id, totalprice),
                ].flat()
            );
            delete req.session.cart;
            res.json({ success: true, order_id });
            // console.log(totalprice);
            // console.log(insert);
            // Update /Create Entry / After Send Response / Clear Cart
            // console.log(order_id);
        } catch (err) {
            console.log(err);
            res.json({ success: false, message: "server error" });
        }
    } else {
        res.json({ success: false, message: "empty cart" });
    }
    // res.sendStatus(200);
});

router.get("/:id.json", async (req, res) => {
    // try {
    //     const {
    //         rows: [order],
    //     } = await getOrder(req.params.id, req.session.userId);
    //     if (order) {
    //         res.json({ success: true, order });
    //     } else {
    //         res.json({ success: false });
    //     }
    // } catch (err) {
    //     console.log("ERROR GETTING ORDER ", err);
    //     res.json({ success: false, message: "server error" });
    // }

    try {
        const [order, { rows: items }] = await Promise.all([
            getOrder(req.params.id, req.session.userId),
            getOrderContent(req.params.id),
        ]);
        if (
            order.rows.length != 0 &&
            req.session.userId == order.rows[0].user_id
        ) {
            res.json({
                success: true,
                order: order.rows[0],
                items,
            });
        } else {
            res.json({ success: false, message: "not authorized" });
        }
    } catch (err) {
        console.log("ERROR GETTING ORDER/ORDER CONTENT: ", err);
    }
});

module.exports = router;
