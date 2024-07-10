import Client from "../domain/Client"
import ClientRepository from "../../repository/ClientRepository"

export default class UpdateClient{
    constructor(private clientRepository: ClientRepository){}
    
    async execute(email: string, inputUpdate: Input){
        const clientExisting = await this.clientRepository.getByEmail(email)
        if(!clientExisting) throw new Error("Client not found")
        await this.clientRepository.update(clientExisting.email.value, new Client(inputUpdate.name, inputUpdate.email))
    }
}
type Input = {
    name: string,
    email: string
}