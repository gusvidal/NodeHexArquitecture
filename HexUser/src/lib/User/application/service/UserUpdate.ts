import { UserNotFoundException } from "../../domain/Exception/UserNotFoundException";
import { User } from "../../domain/User";
import { UserRepository } from "../../domain/UserRepository";
import { UserCreateAt } from "../../domain/valueobject/UserCreateAt";
import { UserEmail } from "../../domain/valueobject/UserEmail";
import { UserId } from "../../domain/valueobject/UserId";
import { UserName } from "../../domain/valueobject/UserName";

export class UserUpdate{
    constructor(private repository: UserRepository){
    }

    async run(id: string, name: string, email: string, createdAt: Date): Promise<void>{
        const user = new User(
            new UserId(id),
            new UserName(name),
            new UserEmail(email),
            new UserCreateAt(new Date())
        );

        const userExists = await this.repository.getOneById(user.id);

        if (!userExists) throw new UserNotFoundException("Usuario no existe en la DB");

        return this.repository.update(user);
    }
}