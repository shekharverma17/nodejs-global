// Start the transaction
import { getSequelizeInstance } from './connect';
const sequelize =  getSequelizeInstance();

import UserGroup from './userGroup.js'
import { GroupModel } from './group.type'
import { UserModelType } from './user.type'

const userGroupTransaction = async (recordId: string, Model: (GroupModel | UserModelType) )=>{
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