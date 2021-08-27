const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    'orderdb',
    'root',
    'root',{
        dialect: 'mysql',
        host: 'localhost',
        port: '3308'
    }
);

module.exports = sequelize;