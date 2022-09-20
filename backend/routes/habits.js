const express = require('express')
const {
    getHabits,
    getHabitById,
    createHabit,
    destroyHabit,
    updateHabit
} = require('../controllers/habitsController')
const requireAuth = require("../middleware/requireAuth")

const router = express.Router()

//require auth for all habit routes
// router.use(requireAuth)

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
