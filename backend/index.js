const app = require('./server');
const mongoose = require('mongoose')
// require('dotenv').config()
const port = process.env.PORT || 3000;
const MONGO_URI= "mongodb+srv://futureproof:fppass@makeithappen.azatkv3.mongodb.net/?retryWrites=true&w=majority"

//connection to mongo and start to listen
mongoose.connect(MONGO_URI)
    .then(() => {
        app.listen(port, () => {
            console.log(`Connected to DB and Express now departing from port ${port}!`)
        })
    })
    .catch((error) => {
        console.log(error)
    })
