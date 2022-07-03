const express = require('express');
const bcrypt = require('bcrypt');
const db = require('./database/index');
const { port } = require('./config/config');
const { authenticate, authorize, hasPermission } = require('./helpers/auth');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const User = db.User;

app.get('/', (req, res) => {
    res.json("Hello World");
});

app.post('/login',authenticate);

app.get('/users',
authorize, 
hasPermission('Admin'),
async (req, res) => {
    const users =  await User.findAll();
    res.status(200).json(users);
});

app.post('/register', 
async (req, res) => {
    const { email, password, role } = req.body;

    if(!email || !password)
        return res.sendStatus(400);

    const user = await User.findOne({ where: { email } });
    if(user)
       return res.sendStatus(409);
    
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    await User.create({
        email, 
        password: hash, 
        salt, 
        role
    });
    res.sendStatus(201);
});

app.listen(port, () => {
    console.log(`Server is up & running on port ${port}`);
});
