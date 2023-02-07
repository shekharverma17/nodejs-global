import { getSequelizeInstance } from './connect';
import { Model, InferAttributes, InferCreationAttributes } from 'sequelize';

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

export default UserGroup;

