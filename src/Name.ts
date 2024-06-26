export default class Name{
    constructor(readonly value: string){
        if(this.isInvalidName(value)) throw new Error("Invalid name")
    }
    private isInvalidName(value:string){
        if(!value) return true
        return !value.match(/[a-zA-Z] [a-zA-Z]+/);
    }
}