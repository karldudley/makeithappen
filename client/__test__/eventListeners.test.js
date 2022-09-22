const renderDOM = require('./helpers');

let dom;
let document;
let localStorage;

describe('view.html', () => {
  beforeEach(async () => {
    dom = await renderDOM('./view.html');
    document = await dom.window.document;
    localStorage = await dom.window.localStorage;
    app = require('../static/js/app.js')
  })
  xtest('displays input boxes when the btn is clicked', () => {
    // const localStorage = [
    //   {Sleep: 'yhufkyug687vk'}
    // ]
    const fakeAPI = [
        // {_id: 'bhuilghuigolufol967ghcvk',
        {name: 'Sleep', targetVal: 5}
        // currentVal: 2,
        // currentStreak: 3,
        // maxStreak: 5,
        // user_id: '111',
        // createdAt: '2022-09-20T11:3:45.728Z',
        // updatedAt: '2022-09-20T11:3:45.728Z',
        // _v: 0}

    ]
    app.appendHabits(fakeAPI)
    const btn = document.querySelector('#Sleep')
    btn.dispatchEvent(new dom.window.Event('click'))
    const inputs = document.querySelectorAll('input')
    expect(inputs).toBeTruthy()
    expect(inputs.length).toBe(2)
  })
})
