const express = require('express')
const getHabits = require('../controllers/habitsController')

const router = express.Router()

// GET all habits
router.get('/', getHabits)

module.exports = router;
