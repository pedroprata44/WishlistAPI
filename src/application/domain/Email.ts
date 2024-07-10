export default class Email{
    constructor(readonly value: string){
    if(this.isInvalidEmail(value)) throw new Error("Invalid email")
    }
    private isInvalidEmail(value:string){
        if(!value) return true
        return !value.match(/^(.+)@(.+)$/);
    }
}