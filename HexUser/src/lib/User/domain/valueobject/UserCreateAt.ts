export class UserCreateAt{
    value: Date;

    constructor(value: Date){
        this.value = value;
        this.isValid();
    }

    private isValid(){
        if(this.value > new Date()){
            throw new Error("La fecha no puede ser posterior a hoy");
        }
    }
}