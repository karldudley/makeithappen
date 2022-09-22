/**
 * @jest-environment jsdom
 */

 const fs = require('fs')
 const path = require('path')
 const html = fs.readFileSync(path.resolve(__dirname, '../view.html'), "utf8")

 global.fetch = require('jest-fetch-mock')

 let app;

 describe('App', () => {

    beforeEach(()=> {
        document.documentElement.innerHTML = html.toString();
        app = require('../static/js/app.js')
        // app2 = require('../static/js/create.js')
    })

    afterEach(() => {
        fetch.resetMocks();
    })

    describe('Requests', () => {

        describe('getAllHabits', () => {
            test('It fetches habits from Heroku', () => {
                app.getAllHabits()
                expect(fetch.mock.calls[0][0]).toMatch(/habits/)
            })
        })
    })

    describe('Helpers', () => {

        describe('appendHabit', () => {
            test('It adds a new habit to the view page', () => {
                const habitCount = document.querySelectorAll('.accordion').length
                app.appendHabit( {name: 'Sleep', targetVal: 300} )
                const newHabitCount = document.querySelectorAll('.accordion').length
                expect(newHabitCount).toEqual(habitCount+1)
            })
        })

        describe('appendHabits', () => {
            test('It posts multiple habits to the page', () => {

                const fakeAPI = [
                    {name: 'Sleep', targetVal : 8},
                    {name: 'Games', targetVal : 7}
                ]
                app.appendHabits(fakeAPI)
                const entryCount = document.querySelectorAll('.accordion').length
                expect(entryCount).toBe(2)
            })

            test('Shows button when empty', () => {
                const fakeAPI = [

                ]
                app.appendHabits(fakeAPI)
                const entryCount = document.querySelectorAll('.accordion').length
                const showButton = document.querySelector('.redirectBtn')
                expect(entryCount).toBeFalsy()
                expect(showButton).toBeTruthy()
            })
        })

        describe('sendDelete', () => {
            test('It sends a delete request to /habits with the habits data', () => {
                const fakeCreateEvent = {
                    preventDefault: jest.fn(),
                    target: {
                        task: {value: 'Test 1'},
                        goal: {value: 70}
                    }
                }
                app.sendDelete('ukyfyu678567')
                expect(fetch.mock.calls[0][1]).toHaveProperty('method', 'DELETE');
                // expect(fetch.mock.calls[0][1]).toHaveProperty('body', JSON.stringify({ name: "Test 1", targetVal: 70}));
            })
        })
    })
 })
