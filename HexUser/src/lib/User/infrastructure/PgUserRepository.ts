import { Pool } from "pg";
import { User } from "../domain/User";
import { UserRepository } from "../domain/UserRepository";
import { UserId } from "../domain/valueobject/UserId";
import { UserCreateAt } from "../domain/valueobject/UserCreateAt";
import { UserName } from "../domain/valueobject/UserName";
import { UserEmail } from "../domain/valueobject/UserEmail";

type PgUser = {
    id: string,
    name: string,
    email: string,
    create_at: Date
};

export class PgUserRepository implements UserRepository{

    client: Pool;

    constructor(databaseUrl: string){
        this.client = new Pool({
            //connectionString: databaseUrl,
            host: "localhost",
            user: "",
            password: "",
            database: "HexArqNode",
            port: 5432,
            idleTimeoutMillis: 30000,
        });
    }
    async create(user: User): Promise<void> {
        const query = {
            text: "INSERT INTO users (id, name, email, create_at) VALUES ($1, $2, $3, $4)",
            values: [user.id.value, user.name.value, user.email.value, user.createAt.value],
        };

        await this.client.query(query);

        //throw new Error("Method not implemented.");
    }
    
    async getAll(): Promise<User[]> {
        const query = {
            text: "SELECT * FROM users",
        };

        const result = await this.client.query<PgUser>(query);
        return result.rows.map((row) => this.mapToDomain(row));
    }
    async getOneById(id: UserId): Promise<User | null> {
        const query = {
            text: "SELECT * FROM users WHERE id = $1",
            values: [id.value],
        };

        const result = await this.client.query<PgUser>(query);
        if (result.rows.length === 0){
            return null;
        }

        const row = result.rows[0];
        return this.mapToDomain(row);
    }

    async update(user: User): Promise<void> {
        const query = {
            text: "UPDATE users SET name = $1, email=$2 WHERE id = $3",
            values: [user.name.value, user.email.value, user.id.value],
        };
        await this.client.query(query);
    }

    async delete(id: UserId): Promise<void> {
        const query = {
            text: "DELETE FROM users WHERE id = $1",
            values: [id.value],
        };
        await this.client.query(query);
    }

    private mapToDomain(user: PgUser): User{
        return new User(
            new UserId(user.id),
            new UserName(user.name),
            new UserEmail(user.email),
            new UserCreateAt(user.create_at)
        );
    }

}
