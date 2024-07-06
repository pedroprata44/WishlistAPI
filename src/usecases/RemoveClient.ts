import ClientRepository from "../repository/ClientRepository"

export default class RemoveClient{
    constructor(private clientRepository: ClientRepository){
    }
    async execute(email: string){
        const clientExisting = await this.clientRepository.getByEmail(email)
        if(!clientExisting) throw new Error("Client not found")
        await this.clientRepository.remove(clientExisting.email.value)
    }
}