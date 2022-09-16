//get all habits
const getHabits = async (req, res) => {
    //connect to Mongo using mongoose
    res.send("Got all habits")
}

module.exports = getHabits;
