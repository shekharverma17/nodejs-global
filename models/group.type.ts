import { FindOptions } from 'sequelize';
import { Model } from 'sequelize-typescript';
export interface GroupModel extends Model {
    name: string,
    permissions: Array<Text>,
    createdAt: Date,
    updatedAt: Date,
    findByPk: (identifier?:number | string | Buffer, options?: Omit<FindOptions<unknown & unknown>, 'where'>,)=> Promise<Model>,
    count: (options?: unknown)=> Promise<number>;
  }
