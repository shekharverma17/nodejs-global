import User from '../models/user'
import userGroupTransaction from '../models/transaction.js'
import {IUser } from './user.interface'
import { UserModelType } from '../models/user.type'
const userServices = {
    getAllUsers: async (): Promise<UserModelType[]> => {
        try {
            return await User.findAll({});
          } catch (error: unknown) {
            console.error(error);
            throw new Error('Failed to fetch users');
          }
    },
    getUserById: async (id: string): Promise<UserModelType | null> => {
        try {
           return await User.findByPk(id);
          } catch (error: unknown) {
            console.error(error);
            throw new Error('Failed to fetch user');
          }
    },
    createUser: async (userData: any): Promise<IUser> => {
        try {
            return await User.create(userData);
           } catch (error: unknown) {
             console.error(error);
             throw new Error('Failed to fetch user');
           }
    },
    updateUser: async (id: string, userData: IUser): Promise<UserModelType[]> => {

        try {
            const [count, updatedUser] = await  User.update(userData, { where: { id: id }, returning: true });
            console.log("User updated successfully: ", updatedUser);
            return updatedUser;
           } catch (error: unknown) {
             console.error(error);
             throw new Error('Failed to update user');
           }
    },
    deleteUser: async (id: string): Promise<void> => {
        try {
            const user =  await userGroupTransaction(id, User as unknown as UserModelType);
            return user;
           } catch (error: unknown) {
             console.error(error);
             throw new Error('Failed to delete user');
           }
    }
};

export default userServices;