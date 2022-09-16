const express = require('express')
const habitsController = require('../controllers/habitsController')

const router = express.Router()

// GET all habits
router.get('/', habitsController.getHabits)

// GET habit by id
router.get('/:id', habitsController.getHabitById)

// POST new habit
router.post('/', habitsController.createHabit)

// DELETE habit
router.delete('/', habitsController.destroyHabit)

module.exports = router;
