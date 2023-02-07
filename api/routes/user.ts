// Layer 1: Routes
import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid'
import * as Joi from 'joi'

import userServices from '../../services/user.service.js'
const userRoute = Router();

interface User {
    login: string,
    password: string,
    age: number,
    isDeleted: boolean,
}

interface Users {
    users: User[]
}

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


// userRoute.get('/', (req, res) => {
//     userServices.getAllUsers()
//         .then(users => {
//             res.json(users);
//         })
//         .catch(err => {
//             res.status(500).send(err);
//         });
// });

userRoute.get('/', (req, res) => {
    userServices.getAllUsers()
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

userRoute.get('/:id', function (req, res) {
    userServices.getUserById(req.params.id)
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

userRoute.post('/', function (req, res) {
    const result = schema.validate(req.body);
    if (result.error) {
        throw new Error(result.error.details[0].message);
    }
    const userId = uuidv4()
    let newItem = {
        id: userId,
        login: req.body.login,
        password: req.body.password,
        age: req.body.age,
        isDeleted: req.body.isDeleted
    };

    const newUser = userServices.createUser(newItem);
    res.status(200).json(newUser);
});


// UPDATE
userRoute.put('/:id', function (req, res) {
    const result = schema.validate(req.body);
    console.log(req.body);
    if (result.error) {
        throw new Error(result.error.details[0].message);
    }

    let updated = {
        id: req.params.id,
        login: req.body.login,
        password: req.body.password,
        age: req.body.age,
        isDeleted: req.body.isDeleted
    };


    userServices.updateUser(req.params.id, updated)
        .then(user => {
            res.json(user);
        })
        .catch(err => {
            res.status(500).send(err);
        });

});

// DELETE
userRoute.delete('/:id', function (req, res) {

    userServices.deleteUser(req.params.id)
        .then(response => {
            res.json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send(err);
        });

});

export default userRoute;
