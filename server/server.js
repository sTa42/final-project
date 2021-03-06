const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const cookieSession = require("cookie-session");

const apiRoute = "/api/v1";
const authRouter = require("./routes/user");
const productRouter = require("./routes/product");
const cartRouter = require("./routes/cart");
const orderRouter = require("./routes/order");
const adddressRouter = require("./routes/address");

const sessionSecret =
    process.env.COOKIE_SECRET || require("./secrets").COOKIE_SECRET;

app.use(compression());
app.use(express.json());

app.use(
    cookieSession({
        secret: sessionSecret,
        maxAge: 1000 * 60 * 60 * 24 * 14,
        sameSite: true,
    })
);

app.use(express.static(path.join(__dirname, "..", "client", "public")));

app.use(`${apiRoute}/user`, authRouter);
app.use(`${apiRoute}/product`, productRouter);
app.use(`${apiRoute}/cart`, cartRouter);
app.use(`${apiRoute}/order`, orderRouter);
app.use(`${apiRoute}/address`, adddressRouter);

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

if (process.env.NODE_ENV == "production") {
    app.use((req, res, next) => {
        if (req.headers["x-forwarded-proto"].startsWith("https")) {
            return next();
        }
        res.redirect(`https://${req.hostname}${req.url}`);
    });
}

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
