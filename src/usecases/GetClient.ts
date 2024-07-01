import { clients } from "../main"

export default class GetClient{
    execute(email: string): Output{
        const client = clients.find(client => client.email.value === email)
        if(!client) throw new Error("Client not found")
        return {
            accountName: client.name.value,
            accountEmail: client.email.value
        }
    }
}
type Output = {
    accountName: string,
    accountEmail: string
}