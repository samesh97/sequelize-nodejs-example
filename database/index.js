const { Sequelize, DataTypes} = require('sequelize');
const { dbConfig } = require('../config/config');

//load models
const User = require('./models/User');

const sequelize = new Sequelize(
    dbConfig.database, 
    dbConfig.username, 
    dbConfig.password, {
        host: dbConfig.host,
        dialect: dbConfig.dialect
});

sequelize.authenticate()
.then(() => {
    console.log(`Database Connection was successful!`);
})
.catch((err) => {
    console.log(err);
})

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = User(sequelize, DataTypes);
db.sequelize.sync({ force: false});

module.exports = db;