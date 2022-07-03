const { UUIDV4 } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'users', 
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: UUIDV4,
                primaryKey: true
            },
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            salt: DataTypes.STRING,
            role: {
                type: DataTypes.STRING,
                defaultValue: 'User'
            }
    });
    return User;
}