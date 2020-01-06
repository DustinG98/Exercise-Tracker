const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const exerciseSchema = require('./exercise.model')

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        min: 3
    },
    email: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    hashPassword: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    exercises: [exerciseSchema],
}, {
    timestamps: true,
})

const User = mongoose.model('User', userSchema);

module.exports = User;