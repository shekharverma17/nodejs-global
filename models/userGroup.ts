import { getSequelizeInstance } from './connect';
import { Model, DataTypes, InferAttributes, InferCreationAttributes } from 'sequelize';

const seq =  getSequelizeInstance();

interface UserGroupModel extends Model<InferAttributes<UserGroupModel>, InferCreationAttributes<UserGroupModel>> {
  userId: string,
  groupId: string,
  createdAt: Date,
  updatedAt: Date,
}

const UserGroup = seq.define<UserGroupModel>('userGroups', {
  userId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  groupId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false
  },
});


// const UserGroup = sequelize.define('userGroups', {
//   userId: { type: Sequelize.UUIDV4, allowNull: false },
//   groupId: { type: Sequelize.UUIDV4, allowNull: false },
//   createdAt: { type: Sequelize.DATE, allowNull: false },
//   updatedAt: { type: Sequelize.DATE, allowNull: false },
// });

// Create the many-to-many relationship between User and Group
// User.belongsToMany(Group, { through: UserGroup });
// Group.belongsToMany(User, { through: UserGroup });

// Group.beforeDestroy((group, options) => {
//   return sequelize.transaction(async t => {
//     await group.removeUsers(group.getUsers(), { transaction: t });
//   });
// });

export default UserGroup;

