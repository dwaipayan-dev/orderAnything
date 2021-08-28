const Sequelize = require('sequelize');
const sequelize = require('./connection');
const User = require('../Tables/User');
const Item = require('../Tables/Item');
const Address = require('../Tables/Address');
const ItemAddress = require('../Tables/ItemAddress');
const Order = require('../Tables/Order');
const OrderItem = require('../Tables/OrderItem');

var associate = async () =>{
    Item.belongsToMany(Address, { through: ItemAddress});
    Address.belongsToMany(Item, { through: ItemAddress});

    User.hasMany(Order, {foreignKey: 'customerId', as: 'Request'});
    User.hasMany(Order, {foreignKey: 'delivererId', as: 'Delivery'});

    Item.belongsToMany(Order, { through: OrderItem});
    Order.belongsToMany(Item, { through: OrderItem})
    try{
        await sequelize.sync();//{force: true});
        /*
        //Testing if User is working
        await User.create({
            userphone: "8628065854",
            username: "Dwaipayan",
            userpassword: "Dashhh",
            userType: "Admin"
        });

        //testing if ItemAddress is working
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

        //testing if Order is working
        let order = await Order.create({
            orderStage: "Task Created"
        });
        
        let customer = await User.create({
            userphone: "8628065754",
            username: "Shah Raj",
            userpassword: "Gopi",
            userType: "Customer"
        });
        
        let deliverer = await User.create({
            userphone: "5586412345",
            username: "Kaamraan",
            userpassword: "Begum",
            userType: "Delivery Man"
        });
        
        await customer.addRequest(order);
        await deliverer.addDelivery(order, {as: 'Deliverer', foreignKey: 'delivererId'});
        console.log("Order Synced successfully");
        
        //testing if orderItems is working
        await order.addItem(item, {through: {
            quantity: 5
        }});
        let order1 = await Order.create({
            orderStage: "Task Created"
        });
        await customer.addRequest(order1);
        await order1.addItem(item, {through: {
            quantity: 7
        }});
        */
        let databases = {
            user: User,
            item: Item,
            address: Address,
            itemAddress: ItemAddress,
            order: Order,
            orderItem: OrderItem
        }
        /*
        await databases.user.create({
            userphone: "8628065859",
            username: "Dwaipayan Mahendra",
            userpassword: "Dashhhadasd",
            userType: "Admin"
        });
        let userPhone = "8628065859";
        let userType = "Admin";
        let oldUser = await databases.user.findOne({ where:{
            userphone: userPhone,
            userType: userType
        }
        });
        console.log(oldUser);
        */
        return(databases);
    } 
    catch(err){
        console.log(err);
    }
};

module.exports = associate;