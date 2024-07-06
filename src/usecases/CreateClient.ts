import Client from "../domain/Client"
import ClientRepository from "../repository/ClientRepository"

export default class CreateClient{

    constructor(private clientRepository: ClientRepository){
    }

    async execute(input: Input): Promise<Output>{
        const clientExisting = await this.clientRepository.getByEmail(input.email)
        if(clientExisting) throw new Error("This email already register")
        const client = new Client(input.name, input.email)
        await this.clientRepository.save(client)
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