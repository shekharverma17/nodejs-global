import Sequelize from 'sequelize'
import User from '../models/user.js'
import Group from '../models/group.js'
const sequelize = new Sequelize('postgres://jcpjkark:s2K2UvN8z4PY2nWhGpTKELLbrWYsV4Sq@manny.db.elephantsql.com/jcpjkark', {
  logging: console.log,
  logging: function (str) {
      // do your own logging
      console.log(str)
  }
}) // Example for postgres

try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}


const UserGroup = sequelize.define('userGroups', {
  userId: { type: Sequelize.UUIDV4, allowNull: false },
  groupId: { type: Sequelize.UUIDV4, allowNull: false },
  createdAt: { type: Sequelize.DATE, allowNull: false },
  updatedAt: { type: Sequelize.DATE, allowNull: false },
});

// Create the many-to-many relationship between User and Group
// User.belongsToMany(Group, { through: UserGroup });
// Group.belongsToMany(User, { through: UserGroup });

// Group.beforeDestroy((group, options) => {
//   return sequelize.transaction(async t => {
//     await group.removeUsers(group.getUsers(), { transaction: t });
//   });
// });

export default UserGroup;

