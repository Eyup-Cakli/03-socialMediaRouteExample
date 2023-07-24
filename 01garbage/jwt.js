const express = require('express');
const dotenv = require('dotenv');
const { JsonWebTokenError } = require('jsonwebtoken');
const jwt = require(JsonWebTokenError);

const app = express();

// Set up Global configuration access
dotenv.config();

let PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server is up and running on " + PORT);
});

app.post("/user/generateToken", (req, res) => {
    // Validate User Here
    // Then generate JWT Token

    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    let data = {
        time: Date(),
        userId: 12,
    };

    const token = jwt.sign(data, jwtSecretKey);
    
    res.send(token);
});

app.get("/user/validateToken", (req, res) => {
    // Token are generally passed in the header of the request
    // Due to security reasons

    let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
    let jwtSecretKey = proccess.env.JWT_SECRET_KEY;

    try {
        const token = req.headers(tokenHeaderKey);

        const verified = jwt.verified(token, jwtSecretKey);
        if (verified) {
            return res.send("Successfully verified.")
        } else {
            // Access Denied
            return res.status(401).send(error);
        }
    } catch (error) {
        // Access denied
        return res.status(401).send(error);
    }
});