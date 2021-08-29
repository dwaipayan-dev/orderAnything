const Sequelize = require('sequelize');
const sequelize = require('../utils/connection');

const Address = sequelize.define('Address', {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    address:{
        type:Sequelize.STRING,
        allowNull: false,
        unique: true
    }
},{
    timestamps: false
});

module.exports = Address;