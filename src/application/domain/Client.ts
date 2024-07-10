import Email from "./Email"
import Name from "./Name"

export default class Client{
    name: Name
    email: Email
    constructor(name: string, email: string){
        this.name = new Name(name),
        this.email = new Email(email)
    }
    static restore(name: string, email: string){
        return new Client(name, email)
    }
}