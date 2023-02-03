import User from '../models/user.js'
import userGroupTransaction from '../models/transaction.js'
const userServices = {
    getAllUsers: () => {
        return User.findAll({});
    },
    getUserById: async (id) => {
        return await User.findByPk(id);
    },
    createUser: async (userData) => {
        return await User.create(userData);
    },
    updateUser: async (id, userData) => {

        User.update(userData, { where: { id: id }, returning: true })
            .then(([rowsUpdated, [updatedUser]]) => {
                console.log("User updated successfully: ", updatedUser);
                return updatedUser;
            })
            .catch((error) => {
                console.log("Error:", error);
            });
    },
    deleteUser: async (id) => {
        await userGroupTransaction(id, User).then((updatedUser) => {
                console.log("User deleted successfully: ", updatedUser);
            })
            .catch((error) => {
                console.log("Error:", error);
            });

    }
};

export default userServices;