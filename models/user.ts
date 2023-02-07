
import { getSequelizeInstance } from './connect';
import { DataTypes, InferAttributes, InferCreationAttributes } from 'sequelize';
import { UserModelType } from './user.type'
const seq =  getSequelizeInstance();

// interface UserModel extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>> {
//   // Some fields are optional when calling UserModel.create() or UserModel.build()
//   login: string;
//   password: string;
//   age: number,
//   isDeleted: boolean,
//   createdAt: Date,
//   updatedAt: Date,
// }



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
// const User = seq.define('user', {
//   login: { type: DataTypes.string, allowNull: false },
//   password: { type: Sequelize.STRING, allowNull: false },
//   age: { type: Sequelize.NUMBER, allowNull: false },
//   isDeleted: { type: Sequelize.BOOLEAN, allowNull: false },
//   createdAt: { type: Sequelize.DATE, allowNull: false },
//   updatedAt: { type: Sequelize.DATE, allowNull: false },
// });

export default User;

