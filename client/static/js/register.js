const form = document.querySelector("form")
form.addEventListener('submit', requestRegister)

async function requestRegister(e){
    localStorage.clear();
    e.preventDefault();
    const email = document.getElementById("inputEmail3").value
    const password = document.getElementById("inputPassword3").value
    try {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({email:email,password:password})
        }
 
        const r = await fetch("https://make-it-happen-fp.herokuapp.com/users/signup", options)
        const data = await r.json()
        console.log(data)
        if (!data.success) { throw new Error('Registration not authorised'); }

        login(data.token);
        if(data.success){
            console.log("Registration successful")
            window.location.replace('./view.html')
        }else {
            console.log("Registration failed")
        }
    } catch (err) {
        console.warn(err);
    }
}

function login(token){
    const user = jwt_decode(token);
    localStorage.setItem("token", token);
    localStorage.setItem("userID", user._id);
    localStorage.setItem("userEmail", user.email);
}

module.exports = {requestRegister, login}
