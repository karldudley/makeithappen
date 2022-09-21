async function createHabit(e) {
    e.preventDefault()

    const entryData = {
        name: e.target.task.value,
        targetVal: e.target.goal.value
    };
    try {
        const token = localStorage.getItem('token')
        const options = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(entryData)
        }
        const response = await fetch('https://make-it-happen-fp.herokuapp.com/habits', options);
        const data = await response.json();
        if(data.err){
            console.warn(data.err);
            logout();
        }
        window.location.replace('./view.html')
    } catch (err) {
        console.log("error")
        console.warn(err);
    }
};

const form = document.querySelector('#create-new-habit')
form.addEventListener('submit', createHabit)

const select = document.querySelector('select')
select.addEventListener('change', updateUnits)

function updateUnits() {
    const units = document.getElementById('units')
    const select = document.querySelector('select')

    if (select.value === "Sleep" || select.value === "Gaming" || select.value === "Screentime" || select.value === "Swimming" || select.value === "Reading") {
        units.textContent = 'hrs'
        console.log(units)
    } else if (select.value === "Water") {
        units.textContent = 'L'
        console.log(units)
    } else {
        units.textContent = 'km'
        console.log(units)
    }
}
//can't export in the client
// module.exports = {createHabit}
