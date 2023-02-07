// Layer 1: Routes
import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid'
import * as Joi from 'joi'
import groupServices from '../../services/group.service.js'
import { GroupModel } from '../../models/group.type'

const groupRoute = Router();

const schema = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(12)
        .required(),
    permissions: Joi.array().items(Joi.string().valid("READ", "WRITE", "DELETE","SHARE", "UPLOAD_FILES")).required()
})
groupRoute.get('/', (req, res) => {
    groupServices.getAllGroups()
        .then(group => {
            res.json(group);
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

groupRoute.get('/:id', function (req, res) {
    groupServices.getGroupById(req.params.id)
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

groupRoute.post('/', function (req, res) {
    const result = schema.validate(req.body);
    if (result.error) {
        throw new Error(result.error.details[0].message);
    }
    const groupId = uuidv4()
    let newItem = {
        id: groupId,
        name: req.body.name,
        permissions: req.body.permissions
    };

    const newGroup = groupServices.createGroup(newItem as GroupModel);
    res.status(200).json(newGroup);
});

// UPDATE
groupRoute.put('/:id', function (req, res) {
    const result = schema.validate(req.body);
    console.log(req.body);
    if (result.error) {
        throw new Error(result.error.details[0].message);
    }

    const updated = {
        id: req.params.id,
        name: req.body.name,
        permissions: req.body.permissions
    };


    groupServices.updateGroup(req.params.id, updated)
        .then(user => {
            res.json(user);
        })
        .catch(err => {
            res.status(500).send(err);
        });

});

// DELETE
groupRoute.delete('/:id', function (req, res) {

    groupServices.deleteGroup(req.params.id)
        .then(response => {
            res.json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send(err);
        });

});

export default groupRoute;
