import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import express from 'express';
import { users } from '../models/users.js'; 
import { accessTokenSecretGenerator, refreshTokenSecretGenerator } from '../generateRandomToken.js'; 

const app = express();
app.use(bodyParser.json());
dotenv.config();
app.use(express.json());
const router = express.Router();

router.use('/login', (req, res, next) => {
    console.log('Login root Time: ', Date.now());
    next();
});

let refreshTokens = [];

export const accessTokenSecret = accessTokenSecretGenerator();
const refreshTokenSecret = refreshTokenSecretGenerator();
// create token 
router.post("/login", async (req, res) => {
    const useremail = req.body.email;
    const userpassword = req.body.password;
    const claim = req.body.claim;

    const userExist = users.find( x => x.email === useremail && x.password === userpassword && x.claim === claim)
    const stableAccessTokenSecret = accessTokenSecret;

    if (userExist) {
        const accessToken = jwt.sign({email: useremail, password: userpassword, claim: claim}, stableAccessTokenSecret, {expiresIn: "5m"});
        const refreshToken = jwt.sign({email: useremail, password: userpassword, claim: claim}, refreshTokenSecret); //process.env.

        refreshTokens.push(refreshToken);

        return res.status(200).json({ accessToken, refreshToken});
    } else {
        return res.status(401).json({message : "Bilgileriniz geçersiz. "});
    }
});

export default router;