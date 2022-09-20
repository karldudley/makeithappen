const Habit = require('../models/habitModel')
const mongoose = require('mongoose')

//get all habits
const getHabits = async (req, res) => {
    try {
        // AUTH
        // const user_id = req.user._id
        // only return habits for the currently logged in user
        // const habits = await Habit.find({ user_id }).sort({createdAt: -1})

        //NO AUTH FOR TESTING
        const habits = await Habit.find({  }).sort({createdAt: -1})

        console.log(habits)
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
    // const { name, targetVal, currentVal, currentStreak, maxStreak } = req.body;
    const { name, targetVal } = req.body;

    try {
        // AUTH
        // const user_id = req.user._id;

        // NO AUTH FOR TESTING
        const user_id = "111"

        currentVal = 0;
        currentStreak = 0;
        maxStreak = 0;

        // const habit = await Habit.create({ name, targetVal, currentVal, currentStreak, maxStreak, user_id })
        const habit = await Habit.create({ name, targetVal, currentVal, currentStreak, maxStreak, user_id })
        res.status(201).json(habit)
    } catch (error) {
        res.status(422).json({error: error.message})
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
