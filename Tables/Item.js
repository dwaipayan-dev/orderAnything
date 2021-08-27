const Sequelize = require('sequelize');
const sequelize = require('../utils/connection');

const Item = sequelize.define('Item', {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    itemName:{
        type:Sequelize.STRING,
        allowNull: false
    },
    itemCategory:{
        type: Sequelize.STRING,
        allowNull: false
    }
},{
    timestamps: false
});

module.exports = Item;