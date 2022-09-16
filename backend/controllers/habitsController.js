//get all habits
const getHabits = async (req, res) => {
    //connect to Mongo using mongoose
    res.send("Got all habits")
}

const getHabitById = async (req, res) => {
    //connect to Mongo using mongoose
    res.send(`Got habit ${req.params.id}`)
}

const postHabit = async (req, res) => {
    //connect to Mongo using mongoose
    res.send('Created new habit')
}

module.exports = {getHabits, getHabitById, postHabit};
