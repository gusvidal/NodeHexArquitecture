export class UserName{
    value: string;

    constructor(value: string){
        this.value = value;
        this.isValid();
    }

    private isValid(){
        if(this.value.length < 4){
            throw new Error("El username debe tener al menos 4 caracteres");
        }
    }
}