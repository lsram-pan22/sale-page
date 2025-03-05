const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: { type: String, require: true, unique: true },
    password: { type: String, require: true, unique: true },
    fristname: { type: String, require: true },
    lastname: { type: String, require: true },
    role: { type: String, require: false, default: '' }
}, { timestamps: true })

module.exports = mongoose.model('User', UserSchema)