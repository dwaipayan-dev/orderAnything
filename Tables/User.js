const Sequelize = require('sequelize');
const sequelize = require('../utils/connection')

const User = sequelize.define('User', {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    userphone:{
        type: Sequelize.BIGINT(10),
        allowNull: false
    },
    username:{
        type: Sequelize.STRING,
        allowNull: false
    },
    userpassword:{
        type: Sequelize.STRING,
        allowNull: false
    },
    userType:{
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    timestamps: false
});

module.exports = User;