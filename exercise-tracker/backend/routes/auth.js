const router = require('express').Router();
const exercises = require('./exercises')

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
    res.header('auth-token', token).header('user_id', user._id).send('Logged In')
})


//VIEW USER BY ID
router.route('/:id').get((req, res) => {
    User.findById(req.params.id)
        .then(users => res.json(users[0]._id))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.use('/:id/exercises', function(req, res, next) {
    req.id = req.params.id;
    next();
}, exercises)

module.exports = router;