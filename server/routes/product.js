const express = require("express");
const router = express.Router();
const {
    getAllProducts,
    getProductDataById,
    getProductsBySearch,
    getRandomProducts,
} = require("../middlewares/db");

router.get("/all.json", async (req, res) => {
    try {
        const { rows: products } = await getAllProducts();
        res.json({ products });
    } catch (err) {
        console.log("ERROR GETTING ALL PRODUCTS FROM DB: ", err);
    }
});

router.get("/featured.json", async (req, res) => {
    try {
        const { rows: products } = await getRandomProducts();
        res.json({ success: true, products });
    } catch (error) {
        console.log(error);
        res.json({ success: false });
    }
});
router.get("/search/:search.json", async (req, res) => {
    try {
        const { rows } = await getProductsBySearch(req.params.search);
        if (rows.length != 0) {
            res.json({ success: true, products: rows });
        } else {
            res.json({ success: false });
        }
    } catch (err) {
        console.log("ERROR GETTING SEARCH RESULT FROM DB: ", err);
        res.json({ success: false });
    }
});
router.get("/:id.json", async (req, res) => {
    const {
        rows: [product],
    } = await getProductDataById(req.params.id);
    res.json({ success: true, product });
});

module.exports = router;
