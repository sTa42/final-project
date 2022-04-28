const express = require("express");
const router = express.Router();
const { getAllProducts, getProductDataById } = require("../middlewares/db");

router.get("/all.json", async (req, res) => {
    const { rows: products } = await getAllProducts();
    res.json({ products });
});
router.get("/:id.json", async (req, res) => {
    const {
        rows: [product],
    } = await getProductDataById(req.params.id);
    res.json({ product });
});

module.exports = router;
