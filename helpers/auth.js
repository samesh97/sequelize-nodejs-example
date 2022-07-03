const JWT = require('jsonwebtoken');
const { token_secret } = require('../config/config');
const bcrypt = require('bcrypt');
const db = require('../database/index');
const User = db.User;

async function authorize(req, res, next){

    const authHeader = req.headers['authorization'];
    if(!authHeader) res.sendStatus(401);

    const token = authHeader.split(' ')[1];
    if(!token) res.sendStatus(401);

    JWT.verify(token, token_secret, (error, payload) => {
        if(error) res.sendStatus(401);
        req.payload = payload;
        next();
    });
    
}
async function authenticate(req, res, next){
    const { email, password } = req.body;

    if(!email || !password){
        res.sendStatus(400);
        next();
    }
    const user = await User.findOne({ where: { email } });
    if(!user){
        res.sendStatus(401);
        next();
    }

    const result = bcrypt.compareSync(password, user.password);
    if(!result){
        res.sendStatus(401);
        next();
    }

    const token = JWT.sign({ email }, token_secret, { expiresIn: '10m' });
    res.status(200).json({
       token
    });
}
const hasPermission = (role)  => {
    return async function(req, res, next){
        
        const { email } = req.payload;
        const user = await User.findOne({ where: { email } });
        if(user.role === role){
            return next();
        }
        res.sendStatus(403);
    }
}

module.exports = {
    authenticate,
    authorize,
    hasPermission
}