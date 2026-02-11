import { User } from "../../domain/user";
import { IUserRepository } from "./user.repository";

export class LocalUserRepository implements IUserRepository{

    private users: User[] = [
    ];

    async addPromo(code: string, id: string){
        const user = await this.find(id);

        user.promos.push(code);
    }

    async findPromo(code: string, id: string): Promise<string | undefined>{
        const user = await this.find(id);

        return user.promos.find(p => p === code)        
    }

    async addUser(user: User) {
        this.users.push(user);
    } 

    async findAll(): Promise<User[]> {
        return this.users;
    }

    async find(id: string): Promise<User> {
        const user = this.users.find(u => u.id === id)

        if(!user) {
            throw new Error("User does not exist")
        }

        return user
    }
}