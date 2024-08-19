import { User } from "./User";
import { UserId } from "./valueobject/UserId";

export interface UserRepository{
    create(user: User): Promise<void>;
    getAll(): Promise<User[]>;
    getOneById(id: UserId): Promise<User | null>;
    update(user: User): Promise <void>;
    delete(id: UserId): Promise <void>;
}