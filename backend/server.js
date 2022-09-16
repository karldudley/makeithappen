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
    res.send("Welcome to the Make it Happen server. The following endpoints currently exist: GET '/habits/', GET '/habits/:id', POST '/habits/', DELETE '/habits/:id', PATCH '/habits/:id'")
    // res.redirect('/habits');
  });

// routes
server.use('/habits', habitRoutes)


module.exports = server;
