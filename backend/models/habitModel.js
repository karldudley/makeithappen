const mongoose = require('mongoose')

const Schema = mongoose.Schema

const habitSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  period: {
    type: String,
    required: true
  },
  frequency: {
    type: Number,
    required: true
  },
  currentStreak: {
    type: Number,
    required: true
  },
  maxStreak: {
    type: Number,
    required: true
  },
  user_id: {
    type: String,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('Habit', habitSchema)
