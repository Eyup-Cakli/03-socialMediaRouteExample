const express = require("express");
const app = express();
const cookies = require("cookie-parser");

const port = 3000;

app.use(cookies());

let users = {
    name: "Jhon",
    age: 28
}

app.get("/", (req, res) => {
    res.send("Cookies Tutorial");
});

app.get("/setuser", (req, res) => {
    res.cookie("userData", users, {maxAge: 900000, httpOnly: true});
    res.send("User data added to cookies");
});

app.get("/getuser", (req, res) => {
    res.send(req.cookies);
});

app.get("/logout", (req, res) => {
    res.clearCookie("userData");
    res.send("User logout successfully");
});

app.listen(port, () => {
    console.log('Listenning to request on http://localhost:' + port);
});