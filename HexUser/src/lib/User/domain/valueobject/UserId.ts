export class UserId{
    value: string;

    constructor(value: string){
        this.value = value;
        this.isValid();
    }

    private isValid(){
        if(this.value.length < 5){
            throw new Error("UserId debe tener al menos 5 caracteres");
        }
    }
}