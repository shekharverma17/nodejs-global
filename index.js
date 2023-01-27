// Import packages
import express  from 'express'
import bodyParser from 'body-parser'
import userRoute  from './api/routes/user.js';
const router = express.Router();

// App
const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use('/api', userRoute);
app.listen('3000')
