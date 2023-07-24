import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';

import loginRoute from './routes/loginRoute.js';
import usersRoute from './routes/usersRoute.js';
import { authenticationMw } from './middleware/authenticationMw.js';

dotenv.config();

const app = express();

app.use(express.json());

const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.use(loginRoute);

app.use('/users', authenticationMw);

app.use(usersRoute);

app.listen(port, () => {
    console.log("Server listennig on port " + port)
});