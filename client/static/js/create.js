function createHabit(e) {

    e.preventDefault()

    const entryData = {
        name: e.target.task.value,
        period: 3,
        frequency: 2,
        currentStreak: 3,
        maxStreak: 5,
        user_id: 'yukguguk'
    };

    const options = {
        method: 'POST',
        body: JSON.stringify(entryData),
        headers: {
            "Content-Type": "application/json"
        }
    };

    fetch('http://localhost:3000/habits', options)
        .then(r => r.json())
        .catch(console.warn)

};


const form = document.querySelector('#create-new-habit')
form.addEventListener('submit', createHabit)
