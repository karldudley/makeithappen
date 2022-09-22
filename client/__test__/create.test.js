/**
 * @jest-environment jsdom
 */

 const fs = require('fs')
 const path = require('path')
 const html = fs.readFileSync(path.resolve(__dirname, '../create.html'), "utf8")

 global.fetch = require('jest-fetch-mock')

 let app;

 describe('App', () => {

    beforeEach(()=> {
        document.documentElement.innerHTML = html.toString();
        app = require('../static/js/create.js')
    })

    afterEach(() => {
        fetch.resetMocks();
    })

    describe('Requests', () => {
        describe('createHabit', () => {
            test('It makes a post request to /habits with the habits data', () => {
                const fakeCreateEvent = {
                    preventDefault: jest.fn(),
                    target: {
                        task: {value: 'Test 1'},
                        goal: {value: 70}
                    }
                }
                app.createHabit(fakeCreateEvent)
                expect(fetch.mock.calls[0][1]).toHaveProperty('method', 'POST');
                expect(fetch.mock.calls[0][1]).toHaveProperty('body', JSON.stringify({ name: "Test 1", targetVal: 70}));
            })
        })
    })

    describe('Functions', () => {

        describe('updateUnits', () => {
            test('Units update when different habits are selected', () => {
                const units = document.getElementById('units')
                const select = document.querySelector('select')

                select.value = "Running"
                app.updateUnits()
                expect(units.textContent).toBe('km')

                select.value = "Water"
                app.updateUnits()
                expect(units.textContent).toBe('L')

                select.value = "Sleep"
                app.updateUnits()
                expect(units.textContent).toBe('hrs')
            })
        })
    })

    
 })
