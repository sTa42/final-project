const express = require("express");
const router = express.Router();
const {
    getAllAddresses,
    addAddress,
    removeAdress,
} = require("../middlewares/db");

router.get("/all.json", async (req, res) => {
    try {
        const { rows: addresses } = await getAllAddresses(req.session.userId);
        res.json({ success: true, addresses });
    } catch (err) {
        console.log("ERROR GETTING ALL ADRESSES FROM DB: ", err);
        res.json({ success: false });
    }
    // res.json({ hello: "hello" });
});

router.post("/add", async (req, res) => {
    console.log(req.body);

    // UPDATE TO USE BODY
    try {
        const {
            rows: [address],
        } = await addAddress(
            req.session.userId,
            req.body.street,
            req.body.zipcode,
            req.body.city
        );
        res.json({ success: true, address });
    } catch (err) {
        console.log("ERROR INSERTING ADDRESS: ", err);
        res.json({ success: false });
    }
});
router.get("/remove", async (req, res) => {
    // UPDATE TO BODY
    try {
        const {
            rows: [address],
        } = await removeAdress(req.session.userId, 3);
        if (address) {
            res.json({ success: true, address });
        } else {
            res.json({ success: false });
        }
    } catch (err) {
        console.log("ERROR REMOVING ADDRESS: ", err);
        res.json({ success: false });
    }
});

module.exports = router;
