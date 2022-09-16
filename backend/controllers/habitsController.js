//get all habits
const getHabits = async (req, res) => {
    //connect to Mongo using mongoose
    res.send("Got all habits")
}

const getHabitById = async (req, res) => {
    //connect to Mongo using mongoose
    res.send(`Got habit ${req.params.id}`)
}

module.exports = {getHabits, getHabitById};
