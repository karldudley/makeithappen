/**
 * @jest-environment jsdom
 */

const fs = require('fs')
const path = require('path')
const html = fs.readFileSync(path.resolve(__dirname, '../register.html'), "utf8")

global.fetch = require('jest-fetch-mock')

let app;

describe('App', () => {

    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
        app = require('../static/js/register.js')
    })

    afterEach(() => {
        fetch.resetMocks();
    })

    describe('Requests', () => {

        describe('requestRegister', () => {
            test('It makes a post request to /users/signup with the users data', () => {

                const fakeAccount =
                {
                    preventDefault: jest.fn(),
                    email: 'jak@example.com',
                    password: 'jklJKL123!'
                }

                app.requestRegister(fakeAccount)
                expect(fetch.mock.calls[0][1]).toHaveProperty('method', 'POST');
            })
        })
    })
})
