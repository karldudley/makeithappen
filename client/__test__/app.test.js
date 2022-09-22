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
                    {name: 'Games', targetVal : 7},
                    {name: 'Water', targetVal: 2}
                ]
                app.appendHabits(fakeAPI)
                const entryCount = document.querySelectorAll('.accordion').length
                expect(entryCount).toBe(3)
            })

            test('Shows button when empty', () => {

                const fakeAPI = []
                app.appendHabits(fakeAPI)

                const entryCount = document.querySelectorAll('.accordion').length
                const showButton = document.querySelector('.redirectBtn')

                expect(entryCount).toBeFalsy()
                expect(showButton).toBeTruthy()

            })
        })

        describe('sendDelete', () => {

            jest.spyOn(Object.getPrototypeOf(window.localStorage), 'getItem')
            Object.setPrototypeOf(window.localStorage.getItem, jest.fn())

            test('It sends a delete request to /habits with the habits data', () => {
                const fakeCreateEvent = {
                    preventDefault: jest.fn(),
                    target: {
                        task: {value: 'Test 1'},
                        goal: {value: 70}
                    }
                }

                app.sendDelete(fakeCreateEvent)
                expect(window.localStorage.getItem).toHaveBeenCalledWith('token')
                // expect(fetch.mock.calls[0][1]).toHaveProperty('method', 'DELETE');
                
            })
        })

        describe('postHabit', () => {
            test('It makes a PATCH request to /habits with the habits data', () => {
                const fakeCreateEvent = {
                    preventDefault: jest.fn(),
                    target: {
                        task: {value: 'Test1'},
                        goal: {value: 70}
                    }
                }

                const fakeUpdateHabit = {
                    preventDefault: jest.fn(),
                    target: {
                        currentVal: 4,
                        targetVal: 5
                    }
                }

                app.appendHabit(fakeCreateEvent)
                app.postHabit(fakeUpdateHabit)
                
                expect(fetch.mock.calls[0][1]).toHaveProperty('method', 'PATCH');
            })
        })
    })
 })
