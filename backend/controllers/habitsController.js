const Habit = require('../models/habitModel')
const mongoose = require('mongoose')

//get all habits
const getHabits = async (req, res) => {
    try {
        const habits = await Habit.find()
        res.status(200).json(habits)
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}

// get a habit by id
const getHabitById = async (req, res) => {
    try {
        const habit = await Habit.findById(req.params.id)
        res.status(200).json(habit)
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}

//create a new habit
const createHabit = async (req, res) => {
    const { name, period, frequency, currentStreak, maxStreak } = req.body;

    try {
        const habit = await Habit.create({ name, period, frequency, currentStreak, maxStreak })
        res.status(201).json(habit)
    } catch (error) {
        res.status(422).json({error: error.message})
    }
}

// delete an existing habit
const destroyHabit = async (req, res) => {
    try {
        //connect to Mongo using mongoose
        res.status(204).send('Destroyed habit')
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}

module.exports = {getHabits, getHabitById, createHabit, destroyHabit};
