const express = require('express');
const app = express();
const server = require("./startup/server").server;
const routes = require("./startup/routes").routes;
const connectToMongoDB = require("./startup/db").connectionToMongoDB;

//connect to mongoDB
connectToMongoDB();

//add routes
routes(app);

//start server
server(app);
