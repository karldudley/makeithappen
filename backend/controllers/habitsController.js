const Habit = require('../models/habitModel')
const mongoose = require('mongoose')

//get all habits
const getHabits = async (req, res) => {
    //connect to Mongo using mongoose
    res.send("Got all habits")
}

//create a new habit
const createHabit = async (req, res) => {
    const { name, period, frequency, currentStreak, maxStreak } = req.body;

    try {
        const habit = await Habit.create({ name, period, frequency, currentStreak, maxStreak })
        res.status(200).json(habit)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    getHabits,
    createHabit
}
