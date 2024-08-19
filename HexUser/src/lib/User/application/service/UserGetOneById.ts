import { UserNotFoundException } from "../../domain/Exception/UserNotFoundException";
import { User } from "../../domain/User";
import { UserRepository } from "../../domain/UserRepository";
import { UserId } from "../../domain/valueobject/UserId";

export class UserGetOneById{
    constructor(private repository: UserRepository){}

    async run(id: string): Promise<User>{
        const user = await this.repository.getOneById(new UserId(id));
        if(!user) throw new UserNotFoundException("El usuario consultado, no se encuentra en la DB");

        return user;
    }

}