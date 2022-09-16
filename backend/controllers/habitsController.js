//get all habits
const getHabits = async (req, res) => {
    //connect to Mongo using mongoose
    res.status(200).send("Got all habits")
}

const getHabitById = async (req, res) => {
    //connect to Mongo using mongoose
    res.status(200).send(`Got habit ${req.params.id}`)
}

const createHabit = async (req, res) => {
    //connect to Mongo using mongoose
    res.status(201).send('Created new habit')
}

const destroyHabit = async (req, res) => {
    //connect to Mongo using mongoose
    res.status(204).send('Destoryed habit')
}

module.exports = {getHabits, getHabitById, createHabit, destroyHabit};
