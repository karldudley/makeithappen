const Habit = require('../models/habitModel')
const mongoose = require('mongoose')

//get all habits
const getHabits = async (req, res) => {
    try {
        // AUTH
        const user_id = req.user._id
        // only return habits for the currently logged in user
        const habits = await Habit.find({ user_id }).sort({createdAt: -1})

        //NO AUTH FOR TESTING
        // const habits = await Habit.find({  }).sort({createdAt: -1})

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
    const { name, targetVal } = req.body;
    console.log("here")
    try {
        console.log("here")
        // AUTH
        const user_id = req.user._id;

        // NO AUTH FOR TESTING
        // const user_id = "111"

        // pre-populated values
        currentVal = 0;
        currentStreak = 0;
        maxStreak = 0;
        const today = new Date()
        console.log(today)
        let streakDate = new Date(today)
        streakDate.setDate(streakDate.getDate() - 1)
        
        const habit = await Habit.create({ name, targetVal, currentVal, currentStreak, maxStreak, streakDate, user_id })
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

    //change depending on if the update relates to streak data
    if(req.body.currentStreak) {
        //update current streak as long as it hasn't already been updated today
        // when it was last updated
        let habitStreak = await Habit.findById({_id: id})
        let streakDate = habitStreak.streakDate;

        // today's date
        let today = new Date(req.body.streakDate)

        // check if they are the same day
        let isSameDay = (streakDate.getDate() === today.getDate() 
        && streakDate.getMonth() === today.getMonth()
        && streakDate.getFullYear() === today.getFullYear())

        // if not the same day update
        if (!isSameDay) {
            let habit = await Habit.findOneAndUpdate({_id: id}, {
                ...req.body
            })
            //update max streak
            console.log(req.body)
            console.log(req.body.currentStreak,habitStreak.maxStreak)

            
            if (req.body.currentStreak>habitStreak.maxStreak){
                let newMax = { maxStreak: req.body.currentStreak };
                habit = await Habit.findOneAndUpdate({_id: id}, newMax)
            }

            if (!habit) {
                return res.status(400).json({error: 'No such habit'})
            }
            
            res.status(200).json(habit)
        }
        
    }
    else {
        const habit = await Habit.findOneAndUpdate({_id: id}, {
            ...req.body
        })

        if (!habit) {
            return res.status(400).json({error: 'No such habit'})
        }
        
        res.status(200).json(habit)
    }
    
}

module.exports = {
    getHabits, 
    getHabitById, 
    createHabit, 
    destroyHabit,
    updateHabit
};
