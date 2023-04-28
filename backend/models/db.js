//Here we used mongoose ODM to communicate with MongoDB
const mongoose = require('mongoose')

//Connect the MongoDB
mongoose.connect('mongodb+srv://root:root@cluster0.yb7lhov.mongodb.net/?retryWrites=true&w=majority');

//Console the message once connection is established
mongoose.connection.on("connected", function(){
    console.log("Application is connected to Database");
})