//import the apollo server
const { ApolloServer } = require('apollo-server-express');
const { typeDefs } = require("./Schema/TypeDefs");
const { resolvers } = require('./Schema/Resolvers');

const express = require('express');
const app = express();

//Connect the MongoDB
require('./models/db');

//ApolloServer needs typeDefs and resolvers parameters
const server = new ApolloServer({ typeDefs, resolvers });

//Invoke the applymiddleware once ApolloServer get started
server.start().then(function() {
    server.applyMiddleware({ app, path: '/graphql', corse: true });
});

//Start the web server
const port = 3001;
app.listen(port, () => {
    console.log(`Webserver is running on ${port} port`);
});