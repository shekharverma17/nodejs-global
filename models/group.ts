
import { getSequelizeInstance } from './connect';
import { DataTypes, Sequelize } from 'sequelize';
import { GroupModel } from './group.type'
const seq =  getSequelizeInstance();

const Group = seq.define<GroupModel>('group', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  permissions: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
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

export default Group;

