const express = require('express')
const {
    getHabits,
    getHabitById,
    createHabit,
    destroyHabit,
    updateHabit
 } = require('../controllers/habitsController')

const router = express.Router()

// GET all habits
router.get('/', getHabits)

// GET habit by id
router.get('/:id', getHabitById)

// POST new habit
router.post('/', createHabit)

// DELETE habit
router.delete('/:id', destroyHabit)

// UPDATE a habit
router.patch('/:id', updateHabit)

module.exports = router;
