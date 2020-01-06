const exercises = require('express').Router();
const User = require('../models/user.model')

const verify = require('./verifyToken')

//GET USERS EXERCISES
exercises.route('/').get(verify, (req, res) => {
    User.findById(req.id)
        .then(user => res.json(user.exercises))
        .catch(err => res.status(400).json('Error: ' + err))
})

//GET USER EXERCISE BY ID
exercises.route('/:exercise_id').get(verify, (req, res) => {
    User.findById(req.id)
        .then(user => res.json(user.exercises))
        .catch(err => res.status(400).json('Error: ' + err))
})

//ADD EXERCISE TO USER
exercises.route('/add').post(verify, (req, res) => {
    const description = req.body.description;
    const duration =  Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newExercise = { description, duration, date }

    User.findById(req.id)
        .then(user => {
            user.exercises.push(newExercise)
            user.save()
            res.json('Exercise Added!')
        })
        .catch(err => res.status(400).json('Error: ' + err))
})

//DELETE USER EXERCISE BY ID
exercises.route('/:exercise_id').delete(verify, (req, res) => {
    const exerciseId = req.params.exercise_id
    console.log(exerciseId)
    User.findById(req.id)
        .then(user => {
            user.exercises = user.exercises.filter(exercise => {
                return String(exercise._id) !== exerciseId;
            })
            user.save()
            res.send('Exercise Deleted')
        })
        .catch(err => res.status(400).json('Error: ' + err))
})

//UPDATE USER EXERCISE BY ID
exercises.route('/:exercise_id').post(verify, (req, res) => {
    User.findById(req.id)
        .then(user => {
            user.exercises = user.exercises.map(exercise => {
                if(String(exercise._id) === req.params.exercise_id) {
                    exercise.description = req.body.description;
                    exercise.duration = Number(req.body.duration);
                    exercise.date = Date.parse(req.body.date);
                    return exercise;
                }
                return exercise
            })
            user.save()
            res.json('Exercise Updated!')
        })
        .catch(err => res.status(400).json('Error: ' + err))
})

module.exports = exercises;