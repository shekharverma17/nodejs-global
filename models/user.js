import Sequelize from 'sequelize'
const sequelize = new Sequelize('postgres://jcpjkark:s2K2UvN8z4PY2nWhGpTKELLbrWYsV4Sq@manny.db.elephantsql.com/jcpjkark') // Example for postgres

try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}


const User = sequelize.define('user', {
  login: { type: Sequelize.STRING, allowNull: false },
  password: { type: Sequelize.STRING, allowNull: false },
  age: { type: Sequelize.NUMBER, allowNull: false },
  isDeleted: { type: Sequelize.BOOLEAN, allowNull: false },
  createdAt: { type: Sequelize.DATE, allowNull: false },
  updatedAt: { type: Sequelize.DATE, allowNull: false },
});

export default User;

