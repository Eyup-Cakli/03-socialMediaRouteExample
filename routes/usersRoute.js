import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import express from 'express';
import { users } from '../models/users.js';


dotenv.config();

const app = express();

app.use(express.json());

const router = express.Router();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(bodyParser.raw());

router.use('/users', (req, res, next) => {
    console.log('User root Time: ', Date.now());
    next();
});

//list all users
router.get('/users', (req, res) => {
    res.json({userData: [users]})
});

// user information for a particular user
router.get('/users/:id', (req, res) => {

    const userId = Number(req.params.id);
    const getUser = users.find(x => x.id === userId);

    if (!getUser) {
        res.status(500).send(userId + ' id user not found.');
    } else {
        res.json(getUser);
    }
});

// add a new user
router.post('/users', (req, res) => {
    const addedUser = req.body;
    users.push(addedUser);
    res.json({userData: [users]})
});

// update a user 
router.put('/users/:id', (req, res) => {
    const userId =  Number(req.params.id);
    const body = req.body;
    const getUser = users.find(x => x.id === userId);
    const index = users.indexOf(getUser);

    if (!getUser) {
        res.status(500).send(userId + ' id user not found.')
    } else {
        const updateUser = {...getUser, ...body};
        users[index] = updateUser;
        res.send(updateUser);
    }
});

//delete a user
router.delete('/users/:id', (req, res) => {
    const userId = Number(req.params.id);
    const newUsers = users.filter(x => x.id != userId);

    if (!newUsers) {
        res.status(500).send(userId + ' id user is not found');
    } else {
        users = newUsers
        res.json({userData: [users]})
    }
});

export default router;