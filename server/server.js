const path = require('path')
const express = require('express')
const server = express()
const cors = require('cors')

const routes = require('./route')

// Middleware
server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use(cors())

// Routes
routes(server)

server.use(express.static(path.join(__dirname, './public')))

module.exports = server
