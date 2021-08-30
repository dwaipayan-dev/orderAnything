# orderAnything
Api to help customer order anything and have it delivered. I would like to thank KiloByte Technologies team for giving me the opportunity to develop this API.

# Prerequisites

1. Docker
2. Postman

# Setting up the API

 1. Copy the project into your local machine.
 2. Open Docker and wait for the Docker Engine to start. 
 3. Open Command Prompt/Terminal, navigate to the project and then type the following command.

    ```
    docker-compose up -d
    ```
 4. Wait for some time for the database to set up. A message database is ready would pop up.
 5. Now you are ready to send requests. The server would run on 6868 if using docker or you may run the application locally on port 8082 with mysql running on port 3308 with database 'orderdb'

# Importing the database (optional)

This step is optional as the app on itself sets up a rudimentary database with a few values. But if you are importing a bigger database from dump( eg. Order_db.sql ) follow the steps given below.

 1. In the terminal, navigate inside your project. then type:
    ```
    docker ps
    ```
 2. Type the following:

    ```
    docker exec -i orderanything_mysqldb_1 mysql -uroot -proot orderdb < orderdb_dump.sql
    ```
 NOTE: Remember to remove the following snippets from ./utils/Associations.js, else it will give duplication error with order_db dump. After removing the snippets remove docker images of mysql and orderanything_app(if any present from previous setup) and setup the project again. <br/>
 
 Snippet 1
 
 ```
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

 ```
 
 Snippet 2
 ```
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
 ```

# Importing Postman

Open Postman, click on import from a collection. Then select the postman collection file on this repo. All the requests and examples would be imported.

# Usage:

Following are the routes used in this application.

# Route 1: Signup route:

Endpoint: '/register', Method: 'POST'<br/>
This is a route to signup the user. An authorization jwt is created and stored in cookies. If cookies are disabled, pass the jwt as query parameter with the key 'auth' with every request after it. Refer to the postman collection to know how to use it.

# Route 2: Login route:

Endpoint: '/login', Method: 'POST'<br/>
This is a route to login the user. An authorization jwt is created and stored in cookies. If cookies are disabled, pass the jwt as query parameter with the key 'auth' with every request after it. Refer to the postman collection to know how to use it.

# Route 3: Cart Checkout route (login as a customer first)

Endpoint: '/cartCheckout', Method: 'POST'<br/>
This is a route where customer can specify items and quantity of each item for the order in the request body and recieves an order confirmation on response. Refer to the postman collection to know how to use it. If you are not logged in with a customer account then you would recieve a message saying you are not authorized to use the service.

# Route 4: Get All Orders based on status filter route (login as an Admin first)

Endpoint: '/getOrders', Method: 'GET'<br/>
This is a route where admin can specify a status as a query parameter under the key 'stage' and recives order details of corresponding orders. Refer to the postman collection to know how to use it. If you are not logged in wih a admin account then you would recieve a message saying you are not authorized to use the service.

# Route 5: Assign Delivery man on a specific order route (login as an Admin first)

Endpoint: '/assignDeliverer', Method: 'POST'<br/>
This is a route where admin sends order id and delivery man id and recieves a confirmation that [delivery man name] is assigned to order [order id]. Refer to the postman collection to know how to use it. If you are not logged in wih a admin account then you would recieve a message saying you are not authorized to use the service.

# Route 6: Get deliveries route for delivery man (login as Delivery Man first)

EndPoint:'/getDeliveries', Method: 'GET' <br/>
This is a route where delivery Man can get a list of all orders assigned to him. Refer to the postman collection to know how to use it. If you are not logged in wih a delivery man account then you would recieve a message saying you are not authorized to use the service.

# Route 7: Update status of order route (login as Delivery Man first)

Endpoint: '/updateStatus', Method: 'POST' <br/>
This is a route where order id is passed as input and along with statusUpdate containing the new order stage. We then recieve a confirmation from the service. Refer to the postman collection to know how to use it. If you are not logged in wih a delivery man account then you would recieve a message saying you are not authorized to use the service.

# Vulnerabilities

There are some things that can be improved upon. I was working under a deadline and hence could not include these within time. But I intend on updating the project with the required changes soon. 

 1. User password has not been encrypted in the database. I will soon update it so that user password is stored in Database in an encrypted form.
 2. Some errors could be handled in a better manner, especially Database errors which would further reinforce security.

# Final Note
 
 Thank you for reading this far. If you face any issues with the API, feel free to connect to me about it. I would look forward to your feedback:)








