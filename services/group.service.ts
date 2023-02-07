import Group from '../models/group'
import userGroupTransaction from '../models/transaction'
import { GroupModel } from '../models/group.type'

interface IGroup {
    id: string,
    name: string,
    permissions: []
}
interface IGroups {
    groups: IGroup[]
}
const groupServices = {

    getAllGroups: async (): Promise<GroupModel[]> => {
        try {
            return await Group.findAll({});
           } catch (error: unknown) {
             console.error(error);
             throw new Error('Failed add user into group.');
           }   
    },
    getGroupById: async (id: string):  Promise<GroupModel | null>=> {
        return await Group.findByPk(id);
    },
    createGroup: async (groupData: any): Promise<GroupModel> => {
        return await Group.create(groupData);
    },
    updateGroup: async (id: string, groupData: IGroup) => {
        try {
            const [updatedGroup] = await  Group.update(groupData, { where: { id: id }, returning: true });
            console.log("Group updated successfully: ", updatedGroup);
            return updatedGroup;
            } catch (error: unknown) {
                console.error(error);
                throw new Error('Failed to update group');
            }
    },
  //  deleteGroup: async (id) => {
    deleteGroup: async (id: string) => {
    try {
        await userGroupTransaction(id, Group as unknown as GroupModel);
        console.log("Group deleted successfully: ");
        } catch (error: unknown) {
            console.error(error);
            throw new Error('Failed to delete group.');
        }   
    }
};

export default groupServices;