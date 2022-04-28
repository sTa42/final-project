const express = require("express");
const router = express.Router();
const { hash, compare } = require("../middlewares/bc");
const db = require("../middlewares/db");

router.get("/id.json", (req, res) => {
    console.log(req.session.userId);
    res.json({ success: true, userId: req.session.userId });
    // res.json({ userId: 10 });
    // res.json({ hello: "helol" });
});
router.get("/user.json", (req, res) => {
    // res.json({
    //     success: true,
    //     user: { id: 10, firstname: "werner", lastname: "heins" },
    // });
    db.getBasicUserData(req.session.userId)
        .then(({ rows }) => {
            res.json({ success: true, user: rows[0] });
        })
        .catch((err) => {
            res.json({ error: "No Sessions" });
            console.log("ERROR WHILE FETCHING USER DATA: ", err);
        });
});
router.post("/register", (req, res) => {
    console.log(req.body);
    if (!req.body.first) {
        return res.json({
            success: false,
            message: "no firstname",
        });
    }
    if (!req.body.last) {
        return res.json({
            success: false,
            message: "no lastname",
        });
    }
    if (!req.body.email) {
        return res.json({
            success: false,
            message: "no email",
        });
    }
    if (!req.body.password) {
        return res.json({
            success: false,
            message: "no password",
        });
    }
    if (!req.body.email.includes("@")) {
        return res.json({
            success: false,
            message: "no valid email format",
        });
    }
    if (!isNaN(req.body.first)) {
        return res.json({
            success: false,
            message: `${req.body.first} is not a valid firstname.`,
        });
    }
    if (!isNaN(req.body.last)) {
        return res.json({
            success: false,
            message: `${req.body.last} is not a valid lastname.`,
        });
    }

    hash(req.body.password)
        .then((hashedPassword) => {
            db.registerUser(
                req.body.first,
                req.body.last,
                req.body.email,
                hashedPassword
            )
                .then(({ rows }) => {
                    console.log(rows[0]);
                    req.session.userId = rows[0].id;
                    res.json({ success: true });
                })
                .catch((err) => {
                    console.log("error while db inserting new user", err);
                    res.json({
                        success: false,
                        message: "SOMETHING BAD HAPPENED",
                    });
                });
        })
        .catch((err) => {
            console.log("error while hashing", err);
            res.json({ success: false, message: "SOMETHING BAD HAPPENED" });
        });
});
router.post("/login", (req, res) => {
    console.log(req.body);
    db.getUserInfoByEmail(req.body.email)
        .then(({ rows }) => {
            if (rows.length !== 0) {
                compare(req.body.password, rows[0].password)
                    .then((isPasswordCorrect) => {
                        if (isPasswordCorrect) {
                            req.session.userId = rows[0].id;
                            res.json({ success: true });
                        } else {
                            res.json({
                                success: false,
                                message: "Incorrect submitted data",
                            });
                        }
                    })
                    .catch((err) => {
                        console.log("ERROR while comparing hashes", err);
                        res.json({
                            success: false,
                            message:
                                "Something went bad on our side. Please try again later.",
                        });
                    });
            } else {
                res.json({
                    success: false,
                    message: "Incorrect submitted data",
                });
            }
        })
        .catch((err) => {
            console.log("ERROR", err);
            res.json({
                success: false,
                message:
                    "Something went bad on our side. Please try again later.",
            });
        });
});
router.post("/logout", (req, res) => {
    req.session = null;
    res.json({ success: true });
});
module.exports = router;
