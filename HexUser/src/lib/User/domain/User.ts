import { UserCreateAt } from "./valueobject/UserCreateAt";
import { UserEmail } from "./valueobject/UserEmail";
import { UserId } from "./valueobject/UserId";
import { UserName } from "./valueobject/UserName";

export class User{
    id: UserId;
    name: UserName;
    email: UserEmail;
    createAt: UserCreateAt;

    constructor(id: UserId, name: UserName, email: UserEmail, createAt: UserCreateAt){
        this.id = id;
        this.name = name;
        this.email = email;
        this.createAt = createAt;
    }

    public nameAndMail(){
        return `${this.name} - ${this.email}`;
    }

    public mapToPrimitives(){
        return{
            id: this.id.value,
            name: this.name.value,
            email: this.email.value,
            createAt: this.createAt.value
        }
    }
}