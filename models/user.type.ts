import { FindOptions } from 'sequelize';
import { Model } from 'sequelize-typescript';

export interface UserModelType extends Model {
    // Some fields are optional when calling UserModel.create() or UserModel.build()
    login: string;
    password: string;
    age: number,
    isDeleted: boolean,
    createdAt: Date,
    updatedAt: Date,
    name: string,
    findByPk: (identifier?:number | string | Buffer, options?: Omit<FindOptions<unknown & unknown>, 'where'>,)=> Promise<Model>,
    count: (options?: unknown)=> Promise<number>,
  }
  