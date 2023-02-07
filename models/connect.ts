import { Sequelize } from 'sequelize';

let sequelizeInstance: Sequelize | null = null;

export const getSequelizeInstance = (): Sequelize => {
  if (!sequelizeInstance) {
    sequelizeInstance = new Sequelize('postgres://jcpjkark:s2K2UvN8z4PY2nWhGpTKELLbrWYsV4Sq@manny.db.elephantsql.com/jcpjkark');
  }
  return sequelizeInstance;
};
