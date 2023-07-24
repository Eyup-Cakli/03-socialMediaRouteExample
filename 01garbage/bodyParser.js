const express = require('express');
const bodyParser = require('body-parser');
var users = require('./models/user');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(bodyParser.raw());

// app.post('/post-test', (req, res) => {
//     console.log('Got body:', req.body);
//     res.sendStatus(200);
// });

app.get('/users', (req, res) => {
    res.json(users);
})

app.get('/users/:id', (req, res) => {
    const userId = Number(req.params.id);
    const getUser = users.find(x => x.id === userId);

    if (!getUser) {
        res.status(500).send('User not found');
    } else {
        res.json({userData: [getUser]})
    }
});

app.post('/users', (req, res) => {
    const incomingUser = req.body;
    users.push(incomingUser);
    res.json(users);
});

app.put('/users/:id', (req, res) => {
    const userId = Number(req.params.id);
    const body = req.body;
    const getUser = users.find(x => x.id === userId);  
    const index = users.indexOf(getUser)

    if (!getUser) {
        res.status(500).send("User not found")
    } else {
        const updateUser = {...getUser, ...body}
        //console.log(...getUser, ...body)
        users[index] = updateUser
        res.send(updateUser)
    }
});

app.delete('/users/:id', (req, res) => {
    const userId = Number(req.params.id);
    const newUsers = users.filter(x => x.id != userId);

    if (!newUsers) {
        res.status(500).send("User not found")
    } else {
        users = newUsers;
        res.send(users);
    }
})

app.listen(3000, () => console.log('Started server at http://localhost:3000!'));