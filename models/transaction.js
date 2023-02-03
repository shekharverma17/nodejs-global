// Start the transaction
import Sequelize from 'sequelize'
import UserGroup from './userGroup.js'
const sequelize = new Sequelize('postgres://jcpjkark:s2K2UvN8z4PY2nWhGpTKELLbrWYsV4Sq@manny.db.elephantsql.com/jcpjkark') // Example for postgres

const userGroupTransaction = async (recordId, Model)=>{
    const transaction = await sequelize.transaction();

    try {
      // Find the user or group record to remove
      const [recordToRemove, recordToRemoveExists] = await Promise.all([
        Model.findByPk(recordId, { transaction }),
        Model.count({ where: { id: recordId }, transaction })
      ]);
    
      if (!recordToRemoveExists) {
        throw new Error(`Record with id ${recordId} not found`);
      }
    
      // Remove the associated records in the UserGroup table
      await UserGroup.destroy({
        where: {
          [Model.name === 'user' ? 'userId' : 'groupId']: recordId
        },
        transaction
      });
    
      
      if(Model.name === 'user'){
// Remove the user or group record
//await recordToRemove.destroy({ transaction });
await recordToRemove.update({ isDeleted: true }, { transaction })
      }else{
// Remove the user or group record
await recordToRemove.destroy({ transaction });
      }
      // Commit the transaction
      await transaction.commit();
    } catch (error) {
      // Rollback the transaction if there is an error
      await transaction.rollback();
      throw error;
    }
    
}

export default userGroupTransaction;