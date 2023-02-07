// Import packages
import * as express  from 'express'
import * as bodyParser from 'body-parser'
import userRoute  from './api/routes/user.js';
import groupRoute  from './api/routes/group.js';
import addUsersToGroup  from './api/routes/userGroup.js';

const router = express.Router();

// App
const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use('/api/users', userRoute);
app.use('/api/groups', groupRoute);
app.use('/api/addUserToGroup', addUsersToGroup);

app.listen('3000')
