const Sequelize = require('sequelize');
const sequelize = require('../utils/connection');

const Item = require('./Item');
const Address = require('./Address');

const ItemAddress = sequelize.define('ItemAddress', {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    }
},{
    timestamps: false
});

/*
Item.belongsToMany(Address, { through: ItemAddress});
Address.belongsToMany(Item, { through: ItemAddress});

sequelize.sync().then(async (result)=>{
    //await are important as we want SQL queries to execute one after the other.
    
    let item = await Item.create({
        itemName: "Chips",
        itemCategory: "Food & Beverages"
    });
    let address1 = await Address.create({
        address: "24x7 Sector 54, Gurgaon, Lat - 12.21, Long - 28.72"
    });

    let address2 = await Address.create({
        address: "Big Bazaar, Sector 25, Gurgaon, Lat - 12.23, Long - 28.79"
    });

    await item.addAddresses([address1, address2]);
    
    console.log("Item and Address synced successfully");
}).catch((err)=>{
    console.log("Items and Address could not sync successfully");
});
*/

module.exports = ItemAddress;