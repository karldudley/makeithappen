const express = require('express')
const {
    getHabits,
    getHabitById,
    createHabit,
    destroyHabit
 } = require('../controllers/habitsController')

const router = express.Router()

// GET all habits
router.get('/', getHabits)

// GET habit by id
router.get('/:id', getHabitById)

// POST new habit
router.post('/', createHabit)

// DELETE habit
router.delete('/', destroyHabit)

module.exports = router;
