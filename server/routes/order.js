const express = require("express");
const router = express.Router();
const {
    getOrder,
    getAllOrdersForUser,
    getOrderContent,
} = require("../middlewares/db");

router.get("/all.json", async (req, res) => {
    try {
        const { rows: orders } = await getAllOrdersForUser(req.session.userId);
        res.json({ success: true, orders });
    } catch (err) {
        console.log(err);
        res.json({ success: false, message: "server error" });
    }
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
        const data = await Promise.all([
            getOrder(req.params.id, req.session.userId),
            getOrderContent(req.params.id),
        ]);
        res.json({
            success: true,
            order: data[0].rows[0],
            items: data[1].rows,
        });
    } catch (err) {
        console.log("ERROR GETTING ORDER/ORDER CONTENT: ", err);
    }
});

module.exports = router;
