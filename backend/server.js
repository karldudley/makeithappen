const express = require('express')
const cors = require('cors');
const habitRoutes = require('./routes/habits')

//express app
const server = express()
server.use(cors());
server.use(express.json())

// morgan
// const morgan = require('morgan')
// if (process.env.NODE_ENV === 'development') {
//   app.use(morgan('dev'))
// }

// routes
server.use('/habits', habitRoutes)

module.exports = server;
