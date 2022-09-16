const express = require('express')
const cors = require('cors');
const habitRoutes = require('./routes/habits')

//express app
const server = express()
server.use(cors());
server.use(express.json())


// routes
server.use('/habits', habitRoutes)

//connection to mongo

module.exports = server;
