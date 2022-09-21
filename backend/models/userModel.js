const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }

}, { timestamps: true })

// static signup method
userSchema.statics.signup = async function (email, password) {
    //validation
    if (!email || !password) {
        throw Error("All fields must be filled")
    }
    if (!validator.isEmail(email)) {
        throw Error("Email is not valid")
    }
    if (!validator.isStrongPassword(password)) {//at least 8 characters, 1 lower & 1 upper, 1 number, 1 symbol
        throw Error("Passwords must contain:\n-At least 8 characters.\n-At least 1 lowercase letter and 1 uppercase letter.\n-At least 1 number.\n-At least 1 symbol.")
    }

    const exists = await this.findOne({ email })

    if (exists) {
        throw Error("Email already in use")
    }

    // salt and hash the password
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ email, password: hash })

    return user
}

//static login method
userSchema.statics.login = async function(email, password) {
    //validation
    if (!email || !password) {
        throw Error("All fields must be filled!")
    }

    const user = await this.findOne({ email })

    if (!user) {
        throw Error("Invalid login details.")
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error("Invalid login details.")
    }

    return user
}

module.exports = mongoose.model('User', userSchema)
