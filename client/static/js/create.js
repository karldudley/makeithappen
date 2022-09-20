function createHabit(e) {

    e.preventDefault()

    const entryData = {
        name: e.target.task.value,
        targetVal: e.target.goal.value
    };

    const options = {
        method: 'POST',
        body: JSON.stringify(entryData),
        headers: {
            "Content-Type": "application/json"
        }
    };

    fetch('https://make-it-happen-fp.herokuapp.com/habits', options)
        .then(r => r.json())
        .catch(console.warn)

};


const form = document.querySelector('#create-new-habit')
form.addEventListener('submit', createHabit)

module.exports = {createHabit}
