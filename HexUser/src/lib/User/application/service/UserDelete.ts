import { UserNotFoundException } from "../../domain/Exception/UserNotFoundException";
import { UserRepository } from "../../domain/UserRepository";
import { UserId } from "../../domain/valueobject/UserId";

export class UserDelete{
    constructor(private repository: UserRepository){}

    async run(id: string): Promise<void>{

        const userId = new UserId(id);
        const userExists = await this.repository.getOneById(userId);

        if (!userExists) throw new UserNotFoundException("Usuario no existe en la DB");
        
        await  this.repository.delete(userId);
    }
}