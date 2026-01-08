
import { User } from "../../domain/user";

export interface IUserRepository{
    addUser(user: User): Promise<void>

    findAll(): Promise<User[]>

    find(id: string): Promise<User>

    addPromo(code: string, id: string): Promise<void>

    findPromo(code: string, id: string): Promise<string | undefined>

}