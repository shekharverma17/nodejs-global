import Sequelize from 'sequelize'
const sequelize = new Sequelize('postgres://jcpjkark:s2K2UvN8z4PY2nWhGpTKELLbrWYsV4Sq@manny.db.elephantsql.com/jcpjkark') // Example for postgres
import QueryTypes from 'sequelize' 

try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}


const Group = sequelize.define('group', {
  name: { type: Sequelize.STRING, allowNull: false },
  permissions: { type: Sequelize.ARRAY(Sequelize.TEXT), allowNull: false },
  createdAt: { type: Sequelize.DATE, allowNull: false },
  updatedAt: { type: Sequelize.DATE, allowNull: false },
});

Group.findSQL = async () => {
  return await sequelize.query("SELECT * FROM groups", { type: QueryTypes.SELECT });
  // We didn't need to destructure the result here - the results were returned directly
   
}
export default Group;

