function getAllHabits() {
    fetch('https://make-it-happen-fp.herokuapp.com/habits')
        .then(r => r.json())
        .then(appendHabits)
        .catch(console.warn)
};

function appendHabits(habits) {
    habits.forEach(appendHabit)
}

function appendHabit(entryData) {
    localStorage.setItem(entryData.name, entryData._id)
    const habitSection = document.querySelector('section')

    const accordionDiv = document.createElement('div')
    accordionDiv.className = 'accordion'
    accordionDiv.id = `${entryData.name}Accordion`

    habitSection.appendChild(accordionDiv)

    const accordionItemDiv = document.createElement('div')
    accordionItemDiv.className = 'accordion-item center'

    const accordionHeader = document.createElement('h2')
    accordionHeader.className = 'accordion-header'
    accordionHeader.textContent = entryData.name

    const image = document.createElement('img')
    image.src = './static/images/sleepicon.png'

    const progressBarDiv = document.createElement('div')
    progressBarDiv.className = 'progress'

    const progressBar = document.createElement('div')
    progressBar.className = 'progress-bar'
    progressBar.setAttribute('style', 'width: 25%;')
    progressBar.setAttribute('aria-valuenow', '25')
    progressBar.setAttribute('aria-valuemin', '0')
    progressBar.setAttribute('aria-valuemax', '100')
    progressBar.textContent = 25

    progressBarDiv.appendChild(progressBar)
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

    const progressLi = document.createElement('li')
    progressLi.textContent = `Progress: ${entryData.currentVal}`
    progressLi.className = `${entryData.name}Progress`

    const targetLi = document.createElement('li')
    targetLi.textContent = `Target: ${entryData.targetVal}`
    targetLi.className = `${entryData.name}Target`

    const streakLi = document.createElement('li')
    streakLi.textContent = `Continuation Streak: ${entryData.currentStreak}`

    const updateButton = document.createElement('button')
    updateButton.textContent = "Edit"
    updateButton.className = `${entryData.name}`
    updateButton.addEventListener('click', updateHabit)


    ul.appendChild(progressLi)
    ul.appendChild(targetLi)
    ul.appendChild(streakLi)

    accordionBodyDiv.appendChild(ul)
    accordionBodyDiv.appendChild(updateButton)

    statsDiv.appendChild(accordionBodyDiv)
    moreInfoDiv.appendChild(statsDiv)
    accordionDiv.appendChild(moreInfoDiv)
}
getAllHabits()


function updateHabit (e) {    
    const progressInput = document.createElement('input') 
    progressInput.setAttribute('type', 'number')
    progressInput.className = `${e.target.className}ProgressInput`

    const targetInput = document.createElement('input') 
    targetInput.setAttribute('type', 'number')
    targetInput.className = `${e.target.className}TargetInput`

    const progressLi = document.querySelector(`.${e.target.className}Progress`)
    console.log(progressLi)
    progressLi.textContent = 'Progress: '
    progressLi.appendChild(progressInput)

    const targetLi = document.querySelector(`.${e.target.className}Target`)
    targetLi.textContent = "Target: "
    targetLi.appendChild(targetInput)

    const saveButton = document.createElement('button')
    saveButton.textContent = "Save"
    saveButton.className = `${e.target.className}`
    saveButton.addEventListener('click', submitUpdatedHabits)
    
    const accordionBody = document.querySelector(`.${e.target.className}Body`)
    accordionBody.appendChild(saveButton)
}

function submitUpdatedHabits (e) {
    const progressInput = document.querySelector(`.${e.target.className}ProgressInput`)

    const targetInput = document.querySelector(`.${e.target.className}TargetInput`)
    
    const progressLi = document.querySelector(`.${e.target.className}Progress`)
    progressLi.textContent = `Progress: ${progressInput.value}`

    const targetLi = document.querySelector(`.${e.target.className}Target`)
    targetLi.textContent = `Target: ${targetInput.value}`
    postHabit(e)
}

function postHabit(e) {

    e.preventDefault()
    const progressInput = document.querySelector(`.${e.target.className}ProgressInput`)

    const targetInput = document.querySelector(`.${e.target.className}TargetInput`)

    const entryData = {
        currentVal: progressInput.value,
        targetVal: progressInput.value
    };

    const options = {
        method: 'PATCH',
        body: JSON.stringify(entryData),
        headers: {
            "Content-Type": "application/json"
        }
    };

    fetch('https://make-it-happen-fp.herokuapp.com/habits', options)
        .then(r => r.json())
        .catch(console.warn)

};



// function createHabit(e) {

//     e.preventDefault()

//     const entryData = {
//         task: e.target.task.value,
//         target: e.target.goal.value,
//         frequency: e.target.frequency.value
//     };

//     const options = {
//         method: 'POST',
//         body: JSON.stringify(entryData),
//         headers: {
//             "Content-Type": "application/json"
//         }
//     };

//     fetch('https://make-it-happen-fp.herokuapp.com/', options)
//         .then(r => r.json())
//         .catch(console.warn)

// };


// const form = document.querySelector('#create-new-habit')
// form.addEventListener('submit', createHabit)

// 

module.exports = {getAllHabits, appendHabit, appendHabits}
