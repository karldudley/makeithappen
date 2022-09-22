function getAllHabits() {
    try {
        const token = localStorage.getItem('token')
        const options = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        fetch('https://make-it-happen-fp.herokuapp.com/habits', options)
            .then(r => r.json())
            .then(appendHabits)
            .catch(console.warn)

    } catch (err) {
        console.log("error")
        console.warn(err);
    }

};

function appendHabits(habits) {
    if (!habits.length) {
        const habitSection = document.querySelector('section')
        habitSection.id = 'empty'
        
        const redirectToCreateBtn = document.createElement('button')
        redirectToCreateBtn.className = 'redirectBtn'
        const redirectToCreate = document.createElement('a')
        redirectToCreate.setAttribute('href', 'create.html')
        redirectToCreateBtn.textContent = "You have no habits, try creating one!"
        redirectToCreate.appendChild(redirectToCreateBtn)

        habitSection.appendChild(redirectToCreate)
    } else {
        plusSign()
        habits.forEach(appendHabit)

    }
}

function plusSign () {
    const div = document.createElement('div')
    div.className = 'plusDiv'
    const habitSection = document.querySelector('section')
    habitSection.id = 'notEmpty'
    const circle = document.createElement("button")
    circle.className = 'circleBtn'
    const text = document.createElement('p')
    text.textContent = "+"
    text.id ='plus'
    const plus = document.createElement("a")
    plus.setAttribute('href', 'create.html')
    circle.appendChild(text)
    plus.appendChild(circle)
    div.appendChild(plus)
    habitSection.appendChild(div)
}

function appendHabit(entryData) {
    localStorage.setItem(entryData.name, entryData._id)
    const habitSection = document.querySelector('section')
    habitSection.id = 'notEmpty'

    const accordionDiv = document.createElement('div')
    accordionDiv.className = 'accordion'
    accordionDiv.id = `${entryData.name}Accordion`

    habitSection.appendChild(accordionDiv)

    const accordionItemDiv = document.createElement('div')
    accordionItemDiv.className = 'accordion-item center'

    const close = document.createElement('span');
    close.className = "close-btn";
    close.textContent = 'X';
    close.addEventListener('click', sendDelete.bind(this, localStorage.getItem(entryData.name)));

    const accordionHeader = document.createElement('h2')
    accordionHeader.className = 'accordion-header'
    accordionHeader.textContent = entryData.name

    const image = document.createElement('img')
    image.className = 'icons'
    image.src = `./static/images/${entryData.name}.png`

    const progressBarDiv = document.createElement('div')
    progressBarDiv.className = 'progress'

    let progressPercentage = Math.round((entryData.currentVal / entryData.targetVal) * 100)
    if (progressPercentage > 100) {
        progressPercentage = 100
    }

    const progressBar = document.createElement('div')
    progressBar.className = 'progress-bar'
    progressBar.id = `${entryData.name}progress-bar`
    progressBar.setAttribute('style', `width: ${progressPercentage}%;`)
    progressBar.setAttribute('aria-valuenow', `${progressPercentage}`)
    progressBar.setAttribute('aria-valuemin', '0')
    progressBar.setAttribute('aria-valuemax', '100')
    progressBar.textContent = `${progressPercentage}%`

    progressBarDiv.appendChild(progressBar)
    accordionItemDiv.appendChild(close)
    accordionItemDiv.appendChild(accordionHeader)
    accordionItemDiv.appendChild(image)
    accordionItemDiv.appendChild(progressBarDiv)
    accordionDiv.appendChild(accordionItemDiv)

    const moreInfoDiv = document.createElement('div')
    moreInfoDiv.className = 'accordion-item'

    const moreInfoHeader = document.createElement('h2')
    moreInfoHeader.className = 'accordion-header'
    moreInfoHeader.id = `${entryData.name}Heading`

    const moreInfoButton = document.createElement('button')
    moreInfoButton.className = 'accordion-button collapsed'
    moreInfoButton.setAttribute('type', 'button')
    moreInfoButton.setAttribute('data-bs-toggle', 'collapse')
    moreInfoButton.setAttribute('data-bs-target', `#${accordionHeader.textContent}Collapse`)
    moreInfoButton.setAttribute('aria-expanded', 'false')
    moreInfoButton.setAttribute('aria-control', `${accordionHeader.textContent}Collapse`)
    moreInfoButton.textContent = "More Info: "

    moreInfoHeader.appendChild(moreInfoButton)
    moreInfoDiv.appendChild(moreInfoHeader)

    const statsDiv = document.createElement('div')
    statsDiv.id = `${accordionHeader.textContent}Collapse`
    statsDiv.className = 'accordion-collapse collapse'
    statsDiv.setAttribute('aria-labelledby', `${moreInfoHeader.id}`)
    statsDiv.setAttribute('data-bs-parent', `${accordionDiv.id}`)

    const accordionBodyDiv = document.createElement('div')
    accordionBodyDiv.className = `${entryData.name}Body accordion-body`

    const ul = document.createElement('ul')

    let suffix;

    if (entryData.name === "Sleep" || entryData.name === "Gaming" || entryData.name === "Screentime" || entryData.name=== "Swimming" || entryData.name === "Reading") {
        suffix = 'hrs'

    } else if (entryData.name === "Water") {
        suffix = 'L'

    } else {
        suffix = 'km'
    }

    const progressLi = document.createElement('li')
    progressLi.textContent = `Progress: ${entryData.currentVal} ${suffix}`
    progressLi.className = `${entryData.name}Progress`

    const targetLi = document.createElement('li')
    targetLi.textContent = `Target: ${entryData.targetVal} ${suffix}`
    targetLi.className = `${entryData.name}Target`

    const currentStreakLi = document.createElement('li')
    currentStreakLi.textContent = `Current Streak: ${entryData.currentStreak}`
    currentStreakLi.className = `${entryData.name}CurrentStreak`

    const maxStreakLi = document.createElement('li')
    maxStreakLi.textContent = `Max Streak: ${entryData.maxStreak}`

    const updateButton = document.createElement('button')
    updateButton.textContent = "Edit"
    updateButton.className = `${entryData.name}`
    updateButton.id = `${entryData.name}`
    updateButton.addEventListener('click', updateHabit)

    let streakDate = new Date(entryData.streakDate)
    let today = new Date()
    // check if they are the same day
    let isSameDay = (streakDate.getDate() === today.getDate()
        && streakDate.getMonth() === today.getMonth()
        && streakDate.getFullYear() === today.getFullYear())

    if (!isSameDay) {
        const compLi = document.createElement('li')
        const compCheck = document.createElement('button')
        compCheck.className = "Water"
        compCheck.textContent = "Complete?"
        compCheck.setAttribute("id", "compCheck")
        compCheck.setAttribute("style", "width: 100%;")
        compCheck.addEventListener('click', sendComplete.bind(this, entryData));
        compLi.appendChild(compCheck)
        accordionBodyDiv.appendChild(compLi)
    } else {
        const compLi = document.createElement('li')
        const compCheck = document.createElement('button')
        compCheck.className = "Water"
        compCheck.textContent = `${entryData.currentStreak} day streak!`
        compCheck.setAttribute("id", "compCheck")
        compCheck.setAttribute("style", "width: 100%;pointer-events: none;")
        compLi.appendChild(compCheck)
        accordionBodyDiv.appendChild(compLi)
        updateButton.setAttribute("style", "display:none;")
    }

    ul.appendChild(progressLi)
    ul.appendChild(targetLi)
    ul.appendChild(currentStreakLi)
    ul.appendChild(maxStreakLi)

    accordionBodyDiv.appendChild(ul)
    accordionBodyDiv.appendChild(updateButton)

    statsDiv.appendChild(accordionBodyDiv)
    moreInfoDiv.appendChild(statsDiv)
    accordionDiv.appendChild(moreInfoDiv)
}


getAllHabits()


function updateHabit(e) {
    const button = e.target
    button.setAttribute('hidden', true)

    const progressInput = document.createElement('input')
    progressInput.setAttribute('type', 'number')
    progressInput.setAttribute('min', 0)
    progressInput.className = `${e.target.className}ProgressInput`

    const targetInput = document.createElement('input')
    targetInput.setAttribute('type', 'number')
    targetInput.setAttribute('min', 0)
    targetInput.className = `${e.target.className}TargetInput`

    const progressLi = document.querySelector(`.${e.target.className}Progress`)
    progressInput.setAttribute('value', parseInt((progressLi.textContent).split(' ')[1]))
    progressLi.textContent = `Progress: `
    progressLi.appendChild(progressInput)

    const targetLi = document.querySelector(`.${e.target.className}Target`)
    targetInput.setAttribute('value', parseInt((targetLi.textContent).split(' ')[1]))
    targetLi.textContent = `Target: `
    targetLi.appendChild(targetInput)

    const saveButton = document.createElement('button')
    saveButton.textContent = "Save"
    saveButton.className = `${e.target.className}`
    saveButton.addEventListener('click', submitUpdatedHabits)

    const accordionBody = document.querySelector(`.${e.target.className}Body`)
    accordionBody.appendChild(saveButton)
}

function submitUpdatedHabits(e) {
    const hiddenSaveButton = e.target
    hiddenSaveButton.setAttribute('hidden', true)

    const reappearUpdateButton = document.getElementById(`${e.target.className}`)
    reappearUpdateButton.removeAttribute('hidden')

    let updateSuffix;

    if (e.target.className === "Sleep" || e.target.className === "Gaming" || e.target.className === "Screentime" || e.target.className === "Swimming" || e.target.className === "Reading") {
        updateSuffix = 'hrs'

    } else if (e.target.className === "Water") {
        updateSuffix = 'L'

    } else {
        updateSuffix = 'km'
    }

    const progressInput = document.querySelector(`.${e.target.className}ProgressInput`)

    const targetInput = document.querySelector(`.${e.target.className}TargetInput`)

    const progressLi = document.querySelector(`.${e.target.className}Progress`)
    progressLi.textContent = `Progress: ${progressInput.value} ${updateSuffix}`

    const targetLi = document.querySelector(`.${e.target.className}Target`)
    targetLi.textContent = `Target: ${targetInput.value} ${updateSuffix}`

    let progressPercentage = Math.round(((progressInput.value) / (targetInput.value)) * 100)
    if (progressPercentage > 100) {
        progressPercentage = 100
    }
    const updatedProgressBar = document.getElementById(`${e.target.className}progress-bar`)
    updatedProgressBar.setAttribute('style', `width: ${progressPercentage}%;`)
    updatedProgressBar.setAttribute('aria-valuenow', `${progressPercentage}`)
    updatedProgressBar.textContent = `${progressPercentage}%`
    if (progressPercentage >= 100) {
        const streakValue = document.querySelector(`.${e.target.className}CurrentStreak`)
        sendComplete({_id: localStorage.getItem(e.target.className), currentStreak: parseInt((streakValue.textContent).split(' ')[2]) })
    }

    postHabit(e)
}

function postHabit(e) {

    e.preventDefault()
    const progressInput = document.querySelector(`.${e.target.className}Progress`)

    const targetInput = document.querySelector(`.${e.target.className}Target`)

    const entryData = {
        currentVal: parseInt((progressInput.textContent).split(' ')[1]),
        targetVal: parseInt((targetInput.textContent).split(' ')[1])
    };
    const token = localStorage.getItem('token')
    const options = {
        method: 'PATCH',
        body: JSON.stringify(entryData),
        headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    };

    fetch(`https://make-it-happen-fp.herokuapp.com/habits/${localStorage.getItem(e.target.className)}`, options)
        .then(r => r.json())
        .catch(console.warn)

};

async function sendDelete(id) {

    var answer = window.confirm("Are you sure you want to delete this habit?");
    if (answer) {
        try {
            const token = localStorage.getItem('token')
            const options = {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
    
            }
            const response = await fetch(`https://make-it-happen-fp.herokuapp.com/habits/${id}`, options);
            const data = await response.json();
            if (data.err) {
                console.warn(data.err);
                logout();
            }
            window.location.replace('./view.html')
        } catch (err) {
            console.log("error")
            console.warn(err);
        }
    }

}

async function sendComplete(habitObject) {
    const id = habitObject._id
    const newStreak = habitObject.currentStreak + 1
    try {

        const token = localStorage.getItem('token')
        const options = {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ currentStreak: newStreak, streakDate: new Date() })
        }
        console.log(options)
        const response = await fetch(`https://make-it-happen-fp.herokuapp.com/habits/${id}`, options);
        const data = await response.json();
        console.log(data)
        if (data.err) {
            console.warn(data.err);
            logout();
        }
        window.location.replace('./view.html')
    } catch (err) {
        console.log("error")
        console.warn(err);
    }
}

module.exports = {getAllHabits, appendHabit, appendHabits, postHabit, submitUpdatedHabits, sendComplete, sendDelete}
