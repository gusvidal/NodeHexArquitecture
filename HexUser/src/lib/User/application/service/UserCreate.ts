import { User } from "../../domain/User";
import { UserRepository } from "../../domain/UserRepository";
import { UserCreateAt } from "../../domain/valueobject/UserCreateAt";
import { UserEmail } from "../../domain/valueobject/UserEmail";
import { UserId } from "../../domain/valueobject/UserId";
import { UserName } from "../../domain/valueobject/UserName";

export class UserCreate{
    constructor(private repository: UserRepository){
    }

    async run(id: string, name: string, email: string, createAt: Date): Promise<void>{
        const user = new User(
            new UserId(id),
            new UserName(name),
            new UserEmail(email),
            new UserCreateAt(createAt)
        )


        return this.repository.create(user);
    }
}