const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const exerciseSchema = require('./exercise.model')

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    exercises: [exerciseSchema],
}, {
    timestamps: true,
})

const User = mongoose.model('User', userSchema);

module.exports = User;