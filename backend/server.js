const express = require('express')
const cors = require('cors');
const habitRoutes = require('./routes/habits')

//express app
const server = express()
server.use(cors());
server.use(express.json())

// morgan
const morgan = require('morgan')
if (process.env.NODE_ENV === 'development') {
  server.use(morgan('dev'))
}

// redirect or display message?
server.get('/', (req, res) => {
    res.send("<h1>Welcome to the Make it Happen server</h1><h2>The following endpoints currently exist:</h2><h3>GET /habits</h3><h3>GET /habits/:id</h3><h3>POST /habits/</h3><h3>DELETE /habits/:id</h3><h3>PATCH /habits/:id")
    // res.redirect('/habits');
  });

// routes
server.use('/habits', habitRoutes)


module.exports = server;
