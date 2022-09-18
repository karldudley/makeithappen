const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id, email) => {
    return jwt.sign({_id, email}, process.env.SECRET, { expiresIn: '1d' })
}

// login user
const loginUser = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.login(email, password)

        //create a token
        const token = createToken(user._id, user.email)

        res.status(200).json({email, token, success: true})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// signup user
const signupUser = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.signup(email, password)

        //create a token
        const token = createToken(user._id, user.email)

        res.status(200).json({email, token, success: true})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    signupUser,
    loginUser
};
