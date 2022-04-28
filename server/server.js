const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const cookieSession = require("cookie-session");

const authRouter = require("./routes/user");
const productRouter = require("./routes/product");

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

app.use("/api/v1/user", authRouter);
app.use("/api/v1/product", productRouter);

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
