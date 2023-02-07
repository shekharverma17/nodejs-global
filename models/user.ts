
import { getSequelizeInstance } from './connect';
import { DataTypes, InferAttributes, InferCreationAttributes } from 'sequelize';
import { UserModelType } from './user.type'
const seq =  getSequelizeInstance();

const User = seq.define<UserModelType>('user', {
  login: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  age: {
    type: DataTypes.NUMBER,
    allowNull: false
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false
  }
});

export default User;

