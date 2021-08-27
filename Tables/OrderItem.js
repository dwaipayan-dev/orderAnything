const Sequelize = require('sequelize');
const sequelize = require('../utils/connection');


const OrderItem = sequelize.define("OrderItem",{
    id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    quantity:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    pickupLocation:{
        type: Sequelize.STRING,
    }
},{
    timestamps: false
});

module.exports = OrderItem;