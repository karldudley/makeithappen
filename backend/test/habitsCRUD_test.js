//import the Models
const Habit = require('../models/habitModel');
const User = require('../models/userModel');
const assert = require('assert');
  
let habit;
let user;
// this will run before running every test
beforeEach(() => {
    // Creating a new Instance of Models
    user = new User({ email: 'duncan@example.com', password: "test123" });
    const userId = user.id;
    habit = new Habit({ name: 'Drink Water', targetVal: 2, user_id: userId });
    habit.save()
        .then(() => done());
});

describe('Creating a habit in MongoDB', () => {
    it('Creates a New Habit', (done) => {
        const newHabit = new Habit({ name: 'Sleep', targetVal: 8, user_id: 'userId' });
        newHabit.save() // returns a promise after some time
            .then(() => {
                //if the newHabit is saved in db and it is not new
                assert(!newHabit.isNew);
                done();
            });
            done();
    });
});
  
describe('Reading Details of Habit', () => {
    it('Finds habit with the name', (done) => {
        Habit.findOne({ name: 'Drink Water' })
            .then((habit) => {
                assert(habit.name === 'Drink Water');
                done();
            });
            done();
    })
})

describe('Updating a habit', () => { 
    it('Sets and saves a habit using an instance', (done) => {
        habit.set('currentVal', 1)
        done();
    });
});

describe('Deleting a habit', () => {
    
    it('removes a habit using its instance', (done) => {
    habit.remove({ name: 'Drink Water' })
        .then(() => Habit.findOne({ name: 'Drink Water' }))
        .then((habit) => {
            assert(habit == null);
            done();
        });
    });

    it('removes multiple habits', (done) => {
    habit.remove({ name: 'Drink Water' })
      .then(() => Habit.findOne({ name: 'Drink Water' }))
      .then((habit) => {
        assert(habit === null);
        done();
      });
    });

    it('finds and removes a habit', (done) => {
    Habit.findOneAndRemove({ name: 'Drink Water' })
      .then(() => Habit.findOne({ name: 'Drink Water' }))
      .then((habit) => {
        assert(habit === null);
        done();
      });
    });
});


