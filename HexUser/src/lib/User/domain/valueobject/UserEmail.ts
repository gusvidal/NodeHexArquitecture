export class UserEmail{
    value: string;

    constructor(value: string){
        this.value = value;
        this.isValid();
    }

    private isValid(){
        if(!this.value.includes("@") || !this.value.includes(".")){
            throw new Error("El mail no es valido");
        }
    }
}