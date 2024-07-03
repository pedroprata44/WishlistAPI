import Client from "../domain/Client"
import { clients } from "../main"
import ClientRepository from "../repository/ClientRepository"

export default class CreateClient{

    constructor(private clientRepository: ClientRepository){
    }

    async execute(input: Input): Promise<Output>{
        if(clients.find(client => client.email.value === input.email)) throw new Error("This email already register")
        const client = new Client(input.name, input.email)
        await this.clientRepository.save(client)
        clients.push(client)
        return {
            accountName: client.name.value,
            accountEmail: client.email.value
        }
    }
}
type Input = {
    name: string,
    email: string
}
type Output = {
    accountName: string,
    accountEmail: string
}