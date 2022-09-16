const app = require('./server');
const mongoose = require('mongoose')

const port = process.env.PORT || 3000;

//connection to mongo and start to listen
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(port, () => {
            console.log(`Connected to DB and Express now departing from port ${port}!`)
        })
    })
    .catch((error) => {
        console.log(error)
    })
