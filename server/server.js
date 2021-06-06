const path = require("path");
const express = require("express");
const server = express();
server.use(express.json());
server.use(express.static(path.join(__dirname, "./public")));
server.use(express.json({limit: '50mb'}));
server.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit:1000000}));
module.exports = server;
