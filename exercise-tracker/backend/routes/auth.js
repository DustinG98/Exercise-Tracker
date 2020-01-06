const router = require('express').Router();
const User = require('../models/user.model')

const jwt = require('jsonwebtoken')

const bcrypt = require('bcryptjs')

const verify = require('./verifyToken')

//LIST ALL USERS
router.route('/').get(verify, (req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err))
})

//ADD USER
router.route('/add').post( async (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    
    //check if user is already in database
    const emailExist = User.findOne({email: email});
    if(emailExist === true) return res.status(400).send('Email already exists');
    
    //hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt)
    
    const newUser = new User({username, email, hashPassword})

    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err))
})

//LOGIN

router.route('/login').post(async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    //check if user is already in database
    const user = await User.findOne({email: email});
    if(user === false) return res.status(400).send('Email or password is wrong.');

    //PASSWORD IS CORRECT
    const validPassword = await bcrypt.compare(password, user.hashPassword)
    if(!validPassword) return res.status(400).send('Email or password is wrong.');


    //Create & assign token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
    res.header('auth-token', token).send(token)
})


//VIEW USER BY ID
router.route('/:id').get((req, res) => {
    User.findById(req.params.id)
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err))
})


//GET USERS EXERCISES
router.route('/:id/exercises/').get(verify, (req, res) => {
    console.log(req.params)
    User.findById(req.params.id)
        .then(user => res.json(user.exercises))
        .catch(err => res.status(400).json('Error: ' + err))
})

//GET USER EXERCISE BY ID
router.route('/:id/exercises/:exercise_id').get(verify, (req, res) => {
    console.log(req.params)
    User.findById(req.params.id)
        .then(user => res.json(user.exercises))
        .catch(err => res.status(400).json('Error: ' + err))
})

//ADD EXERCISE TO USER
router.route('/:id/exercises/add').post(verify, (req, res) => {
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

//DELETE USER EXERCISE BY ID
router.route('/:id/exercises/:exercise_id').delete(verify, (req, res) => {
    const exerciseId = req.params.exercise_id
    console.log(exerciseId)
    User.findById(req.params.id)
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
router.route('/:id/exercises/:exercise_id').post(verify, (req, res) => {
    User.findById(req.params.id)
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


module.exports = router;