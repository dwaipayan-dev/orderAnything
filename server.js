const express = require('express');
const sequelize = require('./utils/connection');

const associate = require('./utils/Associations');
const db = associate();

const jwt = require('jsonwebtoken');
const User = require('./Tables/User');
const Item = require('./Tables/Item');
const Address = require('./Tables/Address');
const ItemAddress = require('./Tables/ItemAddress');
const Order = require('./Tables/Order');
const OrderItem = require('./Tables/OrderItem');
const cookieParser = require('cookie-parser');
const app = express();

//Code below is to set all request headers to use content-type = application/json instead of application/formurl encoded

//extensions to parse json encoded and urlencoded req body
//Note To self: Always remember to put all the use() as soon as we define the app variable. Doesn't work otherwise
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));

const PORT = 8082;
const SECRET = "Silent"

//Signup API
app.post('/register', async(req, res)=>{
    try{
        console.log("Cookies:", req.cookies);
        console.log(db);
        const { userPhone, userName, userPassword, userType } = req.body;
        console.log(userPhone)
        if(!(userPhone && userName && userPassword && userType)){
            res.status(400).send("All Fields are required");
        }
        console.log(User)
        let oldUser = await User.findOne({ where:{
            userphone: userPhone,
            userType: userType
        }
        })
        if(oldUser){
            return res.status(400).send("User already exists.")
        }
        else{
            var newUser = await User.create({
                userphone: userPhone,
                username: userName,
                userpassword: userPassword,
                userType: userType
            });

            //Create Token
            const token = jwt.sign({
                userId: newUser.id,
                userType: newUser.userType,
                userName: newUser.username,
                userPhone: newUser.userphone
            }, SECRET, {
                expiresIn: "2h"
            });

            console.log(token);
            res.cookie('Authorization', token);
            
            res.status(200).send({user: newUser, token: token, message: "User created Successfully"});
        }
    }
    catch(err){
        console.log(err);
        //res.status(400).send("Bad Request");
    }
})

//Login API
app.post('/login', async (req, res) =>{
    try{
        //var result = validateJwt(req);
        //console.log(result);
        const { userPhone, userPassword } = req.body;
        if(!(userPhone && userPassword)){
            res.status(400).send("All Fields are required");
        }

        let user = await User.findOne({
            where:{
                userphone: userPhone,
                userpassword: userPassword
            }
        })

        if(user){
            const token = jwt.sign({
                userId: user.id,
                userType: user.userType,
                userName: user.username,
                userPhone: user.userphone
            }, SECRET, {
                expiresIn: "2h"
            });

            console.log(token);
            res.cookie('Authorization', token);

            let decoded = jwt.verify(token, SECRET);
            console.log(decoded);
            
            res.status(200).send({user: user, token: token, message: "User Logged In Successfully"});
        }
        else{
            res.status(400).send("No Account Found");
        }

    }
    catch(err){
        console.log(err);
    }
})

//Create Order API(available only to Customer)
app.post('/cartCheckout', async(req, res) =>{
    try{
        var Auth = validateJwt(req);
        if(Auth === 0){
            res.status(400).send("You are probably not logged in. Login Again!");
        }
        else{
            if(Auth.userType === 'Customer'){
                let user_id = Auth.userId;
                let currentUser = await User.findOne({
                    where:{
                        id: user_id
                    }
                });
                let currentOrder = await Order.create({
                    orderStage: "Task Created"
                });
                await currentUser.addRequest(currentOrder);
                var cartItems = req.body;
                cartItems.forEach(async(cartItem) => {
                    let item_name = cartItem.itemName;
                    let item = await Item.findOne({
                        where:{
                            itemName: item_name
                        }
                    });
                    var availableAddresses = await item.getAddresses();
                    var pickup = availableAddresses[Math.floor(Math.random() * (availableAddresses.length - 1 ))].address;
                    let item_quantity = cartItem.quantity;
                    await currentOrder.addItem(item, {through: {
                        quantity: item_quantity,
                        pickupLocation: pickup
                    }});
                    
                });
                
                res.status(200).send("Order added Successfully");
            }
            else{
                res.status(400).send("You are not authorized to use this service.");
            }
        }
    }
    catch(err){
        console.log(err);
    }
})

app.listen(PORT, ()=>{
    console.log("Server listening on PORT " + PORT)
    sequelize.authenticate().then(()=>{
        console.log("Connected to Database successfully");
    }).catch((err)=>{
        console.log("Unable to connect to database due to" + err);
    });
    //console.log("Db is " + db)
    
});

function validateJwt(req){
    const AuthToken = req.cookies.Authorization;
    if(!AuthToken){
        return 0;
    }
    else{
        let decoded = jwt.verify(AuthToken, SECRET);
        return decoded;
    }
    

}