import ClientRepository from "../../repository/ClientRepository"

export default class GetClient{
    constructor(private clientRepository: ClientRepository){
    }
    async execute(email: string): Promise<Output>{
        const client = await this.clientRepository.getByEmail(email)
        if(!client) throw new Error("Client not found")
        return{
            accountName: client.name.value,
            accountEmail: client.email.value
        }
    }
}
type Output = {
    accountName: string,
    accountEmail: string
}