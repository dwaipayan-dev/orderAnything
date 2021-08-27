const Sequelize = require('sequelize');
const sequelize = require('../utils/connection');
const User = require('./User');

const Order = sequelize.define('Order', {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement:true
    },
    orderStage:{
        type: Sequelize.STRING,
        allowNull: false
    }
},{
    timestamps: false
});

module.exports = Order;