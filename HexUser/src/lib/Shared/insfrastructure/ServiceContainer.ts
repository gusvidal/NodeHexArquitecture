import { InMemoryUserRepository } from "../../User/infrastructure/InMemoryUserRepository";
import { UserCreate } from "../../User/application/service/UserCreate";
import { UserDelete } from "../../User/application/service/UserDelete";
import { UserGetAll } from "../../User/application/service/UserGetAll";
import { UserGetOneById } from "../../User/application/service/UserGetOneById";
import { UserUpdate } from "../../User/application/service/UserUpdate";
import { PgUserRepository } from "../../User/infrastructure/PgUserRepository";

const URL_CONNECTION_STRING = "postgres://guti:Logan980@localhost:5432/HexArqNode";
const userRepository = new PgUserRepository("URL_CONNECTION_STRING");
//const userRepository = new InMemoryUserRepository();

export const ServiceContainer = {
    user: {
        getAll: new UserGetAll(userRepository),
        getOneById: new UserGetOneById(userRepository),
        update: new UserUpdate(userRepository),
        delete: new UserDelete(userRepository),
        create: new UserCreate(userRepository)
    },
}