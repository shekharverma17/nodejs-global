import Group from '../models/group.js'
import UserGroup from '../models/userGroup.js'
import userGroupTransaction from '../models/transaction.js'
const groupServices = {
    addUsersToGroup: async (userId, groupId) => {

        // We didn't need to destructure the result here - the results were returned directly
        const newGroup = await UserGroup.create({userId, groupId});
        return newGroup;
                
            },
    getAllGroups: () => {

// We didn't need to destructure the result here - the results were returned directly

        return Group.findAll({});
    },
    getGroupById: async (id) => {
        return await Group.findByPk(id);
    },
    createGroup: async (groupData) => {
        console.log('===groupData===', groupData)
        const newGroup = await Group.create(groupData);
        return newGroup;
    },
    updateGroup: async (id, groupData) => {

        Group.update(groupData, { where: { id: id }, returning: true })
            .then(([rowsUpdated, [updatedGroup]]) => {
                console.log("Group updated successfully: ", updatedGroup);
                return updatedGroup;
            })
            .catch((error) => {
                console.log("Error:", error);
            });
    },
  //  deleteGroup: async (id) => {
    deleteGroup: async (id) => {
       // await userGroupTransaction(id, Group);
        // Delete 
        await userGroupTransaction(id, Group).then(() => {
                console.log("Group deleted successfully: ");
            })
            .catch((error) => {
                console.log("Error:", error);
            });

    }
};

export default groupServices;