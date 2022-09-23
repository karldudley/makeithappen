const renderDOM = require('./helpers');

let dom;
let document;
let app;

describe('view.html', () => {
  beforeEach(async () => {
    dom = await renderDOM('view.html');
    document = await dom.window.document;
    app = require('../static/js/app.js')
  })

  describe('updateHabit', () => {
    test('It shows an input box when edit is pressed', () => {

      const fakeAPI = [{ name: 'Sleep', targetVal: 5 }]

      app.appendHabits(fakeAPI)
      const btn = document.querySelector('#Sleep')
      btn.dispatchEvent(new dom.window.Event('click'))
      const inputs = document.querySelectorAll('input')
      expect(inputs).toBeTruthy()
      expect(inputs.length).toBe(2)

    })
  })


})

// const fakeAPI = [
//   // {_id: 'bhuilghuigolufol967ghcvk',
//   {name: 'Sleep', targetVal: 5}
//   // currentVal: 2,
//   // currentStreak: 3,
//   // maxStreak: 5,
//   // user_id: '111',
//   // createdAt: '2022-09-20T11:3:45.728Z',
//   // updatedAt: '2022-09-20T11:3:45.728Z',
//   // _v: 0}

// ]
// app.appendHabits(fakeAPI)
// const btn = document.querySelector('#Sleep')
// btn.dispatchEvent(new dom.window.Event('click'))
// const inputs = document.querySelectorAll('input')
// expect(inputs).toBeTruthy()
// expect(inputs.length).toBe(2)
