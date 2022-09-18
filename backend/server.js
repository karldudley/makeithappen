const express = require('express')
const cors = require('cors');
const habitRoutes = require('./routes/habits')
const userRoutes = require('./routes/users')


//express app
const server = express()
server.use(cors());
server.use(express.json())

// morgan
const morgan = require('morgan')
if (process.env.NODE_ENV === "dev") {
  server.use(morgan('dev'))
}

server.get('/', (req, res) => {
    res.send("<h1 style=\"color:#D81159;\">Welcome to the Make it Happen server</h1><h2>The following endpoints currently exist:</h2><h3>GET /habits</h3><h3>GET /habits/:id</h3><h3>POST /habits/</h3><h3>DELETE /habits/:id</h3><h3>PATCH /habits/:id</h3><h3>POST /users/signup</h3><h3>POST /users/login</h3>")
  });

// routes
server.use('/habits', habitRoutes)
server.use('/users', userRoutes)


module.exports = server;
