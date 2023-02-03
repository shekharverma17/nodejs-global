import UserGroup from '../models/userGroup.js'
import { v4 as uuidv4 } from 'uuid'
const userGroupServices = {
    addUsersToGroup: async (userId, groupId) => {
        const Id = uuidv4()
    // We didn't need to destructure the result here - the results were returned directly
    // const newGroup = await UserGroup.create({Id, userId, groupId});
    // return newGroup;
             // Create a new user
             const dt = { id: Id, userId: userId, groupId: groupId}
             console.log(dt);
const g = await UserGroup.create(dt);
console.log("Jane's auto-generated ID:", g); 
return g;  
    },
   
};

export default userGroupServices;