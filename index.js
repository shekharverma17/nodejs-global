// Import packages
import express  from 'express'
import bodyParser from 'body-parser'
import { v4 as uuidv4 } from 'uuid'
import Joi from 'joi'

// create new router
const router = express.Router();

// App
const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
// create a JSON data array
const data = [
    { id: "1", login: '_shekhar',  password: "abc", age: 31, isDeleted: false },
];



app.listen('3000')

// First route
app.get('/', (req, res) => {
    res.json(data)
})

const schema = Joi.object({
    login: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    password: Joi.string()
        .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),

    age: Joi.number()
        .integer()
        .min(4)
        .max(130),

    isDeleted: Joi.boolean().required()
})

app.get('/:id', function (req, res) {
    // find an object from `data` array match by `id`
    let found = data.find(function (item) {
        return item.id === req.params.id;
    });
    // if object found return an object else return 404 not-found
    if (found) {
        res.status(200).json(found);
    } else {
        res.sendStatus(404);
    }
});


// CREATE
app.post('/', function (req, res) {
    const result = schema.validate(req.body);
    if (result.error) {
        throw new Error(result.error.details[0].message);
    }
    const userId = uuidv4()
    // create an object of new Item
    let newItem = {
        id: userId, 
        login: req.body.login,
        password: req.body.password, 
        age: req.body.age,
        isDeleted: req.body.isDeleted
    };

    // push new item object to data array of items
    data.push(newItem);

    // return with status 200
    res.status(200).json(newItem);
});


// UPDATE
app.put('/:id', function (req, res) {
    const result = schema.validate(req.body);
    if (result.error) {
        throw new Error(result.error.details[0].message);
    }
    // get item object match by `id`
    let found = data.find(function (item) {
        return item.id === req.params.id;
    });

    // check if item found
    if (found) {
        let updated = {
            id: found.id,
            login: req.body.login, 
            password: req.body.password, 
            age: req.body.age, 
            isDeleted: req.body.isDeleted
        };

        // find index of found object from array of data
        let targetIndex = data.indexOf(found);

        // replace object from data list with `updated` object
        data.splice(targetIndex, 1, updated);
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
});


// DELETE
app.delete('/:id', function (req, res) {
    // find item from array of data
    let found = data.find(function (item) {
        return item.id === req.params.id;
    });

    if (found) {
        let updated = {
            ...found,
            isDeleted: true // new date object
        };
        let targetIndex = data.indexOf(found);

        // splice means delete item from `data` array using index
        data.splice(targetIndex, 1, updated);
    }

    // return with status 200
    res.sendStatus(204);
});