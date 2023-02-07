// user.interface.ts
export interface IUser {
    login: string,
    password: string,
    age: number,
    isDeleted: boolean,
}

export interface IUsers {
    users: IUser[]
}