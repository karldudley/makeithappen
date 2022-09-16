//get all habits
const getHabits = async (req, res) => {
    try {
        //connect to Mongo using mongoose
        res.status(200).send("Got all habits")
    } catch (error) {
        res.status(404).json({err})
    }
}

const getHabitById = async (req, res) => {
    try {
        //connect to Mongo using mongoose
        res.status(200).send(`Got habit ${req.params.id}`)
    } catch (error) {
        res.status(404).json({err})
    }
}

const createHabit = async (req, res) => {
    try {
        //connect to Mongo using mongoose
        res.status(201).send('Created new habit')
    } catch (error) {
        res.status(422).json({err})
    }
}

const destroyHabit = async (req, res) => {
    try {
        //connect to Mongo using mongoose
        res.status(204).send('Destoryed habit')
    } catch (error) {
        res.status(404).json({err})
    }
}

module.exports = {getHabits, getHabitById, createHabit, destroyHabit};
