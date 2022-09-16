const express = require('express')
const {
    getHabits,
    createHabit
 } = require('../controllers/habitsController')

const router = express.Router()

// GET all habits
router.get('/', getHabits)

// POST a new habit
router.post('/', createHabit)

module.exports = router;
