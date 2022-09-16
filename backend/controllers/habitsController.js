const Habit = require('../models/habitModel')
const mongoose = require('mongoose')

//get all habits
const getHabits = async (req, res) => {
    const habits = await Habit.find({}).sort({createdAt: -1})
    
    res.status(200).json(habits);
}

//get a single habit
const getHabitById = async (req, res) => {
    try {
        //connect to Mongo using mongoose
        res.status(200).send(`Got habit ${req.params.id}`)
    } catch (error) {
        res.status(404).json({err})
    }
}

//create a new habit
const createHabit = async (req, res) => {
    const { name, period, frequency, currentStreak, maxStreak } = req.body;

    try {
        const habit = await Habit.create({ name, period, frequency, currentStreak, maxStreak })
        res.status(201).json(habit)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//delete a habit
const destroyHabit = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error: 'No such habit'})
    }
  
    const habit = await Habit.findOneAndDelete({_id: id})
  
    if(!habit) {
      return res.status(400).json({error: 'No such habit'})
    }
  
    res.status(200).json(habit)
}

// update a habit
const updateHabit = async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error: 'No such habit'})
    }
  
    const habit = await Habit.findOneAndUpdate({_id: id}, {
      ...req.body
    })
  
    if (!habit) {
      return res.status(400).json({error: 'No such habit'})
    }
  
    res.status(200).json(habit)
}

module.exports = {
    getHabits, 
    getHabitById, 
    createHabit, 
    destroyHabit,
    updateHabit
};
