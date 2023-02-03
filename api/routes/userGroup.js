// Layer 1: Routes
import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid'
import Joi from 'joi'
import userGroupServices from '../../services/userGroup.service.js'
const userGroupRoute = Router();

const userGroupSchema = Joi.object({
    userId: Joi.string().guid({ version: 'uuidv4' }).required(),
    groupId: Joi.string().guid({ version: 'uuidv4' }).required()
})

userGroupRoute.post('/', function (req, res) {
    const result = userGroupSchema.validate(req.body);
    if (result.error) {
        throw new Error(result.error.details[0].message);
    }
    userGroupServices.addUsersToGroup(req.body.userId,req.body.groupId).then(group => {
        res.status(200).json(group);
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

export default userGroupRoute;
