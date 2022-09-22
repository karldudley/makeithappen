/**
 * @jest-environment jsdom
 */

 const fs = require('fs')
 const path = require('path')
 const html = fs.readFileSync(path.resolve(__dirname, '../login.html'), "utf8")
 
 global.fetch = require('jest-fetch-mock')
 
 let app;
 
 describe('App', () => {
 
     beforeEach(() => {
         document.documentElement.innerHTML = html.toString();
         app = require('../static/js/login.js')
     })
 
     afterEach(() => {
         fetch.resetMocks();
     })
 
     describe('Requests', () => {
 
         describe('requestLogin', () => {
             test('It makes a post request to /users/login with the users data', () => {
 
                 const fakeAccount =
                 {
                     preventDefault: jest.fn(),
                     email: 'jak@example.com',
                     password: 'jklJKL123!'
                 }
 
                 app.requestLogin(fakeAccount)
                 expect(fetch.mock.calls[0][1]).toHaveProperty('method', 'POST');
                 // expect(fetch.mock.calls[0][1]).toHaveProperty('body', JSON.stringify({ name: "Test 1", targetVal: 70}));
             })
         })
     })
 })
