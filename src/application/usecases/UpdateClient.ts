
import Client from "../domain/Client"
import ClientRepository from "../../repository/ClientRepository"

export default class UpdateClient{
    constructor(private clientRepository: ClientRepository){}
    
    async execute(email: string, inputUpdate: Input): Promise<Output>{
        const clientExisting = await this.clientRepository.getByEmail(email)
        if(!clientExisting) throw new Error("Client not found")
        await this.clientRepository.update(clientExisting.email.value, new Client(inputUpdate.name, inputUpdate.email))
        const client = await this.clientRepository.getByEmail(inputUpdate.email)
        return {
            nameUpdated: client?.name.value,
            emailUpdated: client?.email.value
        }
    }
}
type Input = {
    name: string,
    email: string
}
type Output = {
    nameUpdated?: string,
    emailUpdated?: string
}