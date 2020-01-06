const router = require('express').Router();
let User = require('../models/user.model')

//LIST ALL USERS
router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err))
})


//VIEW USER BY ID
router.route('/:id').get((req, res) => {
    User.findById(req.params.id)
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err))
})


//GET USERS EXERCISES
router.route('/:id/exercises').get((req, res) => {
    User.findById(req.params.id)
        .then(user => res.json(user.exercises))
        .catch(err => res.status(400).json('Error: ' + err))
})

//ADD EXERCISE TO USER
router.route('/:id/exercises/add').post((req, res) => {
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newExercise = { description, duration, date }

    User.findById(req.params.id)
        .then(user => {
            user.exercises.push(newExercise)
            user.save()
            res.json('Exercise Added!')
        })
        .catch(err => res.status(400).json('Error: ' + err))
})

//ADD USER
router.route('/add').post((req, res) => {
    const username = req.body.username;

    const newUser = new User({username})
    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err))
})

module.exports = router;