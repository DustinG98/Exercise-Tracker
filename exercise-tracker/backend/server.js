const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config();

const app = express()
const port = process.env.PORT || 5000;

const corsOptions = {
    exposedHeaders: ['auth-token', 'user_id']
}

app.use(cors(corsOptions));
app.use(express.json())


const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully')
})

const authRouter = require('./routes/auth')

app.use('/auth/user', authRouter)

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})