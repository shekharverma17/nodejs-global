import UserGroup from '../models/userGroup.js'
import UserGroupModel from '../models/userGroup'
interface IUserGroup {
    userId: string,
    groupId: string,
}

const userGroupServices = {
    addUsersToGroup: async (userId: string, groupId: string): Promise<IUserGroup> => {
        // We didn't need to destructure the result here - the results were returned directly
        try {
            return await UserGroup.create({userId, groupId} as any);
           } catch (error: unknown) {
             console.error(error);
             throw new Error('Failed add user into group.');
           }   
        },
};

export default userGroupServices;