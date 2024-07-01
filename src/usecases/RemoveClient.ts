import { clients, removeClient } from "../main"

export default class RemoveClient{
    execute(email: string){
        const client = clients.find(client => client.email.value === email)
        if(!client) throw new Error("Client not found")
        removeClient(client.email.value)
    }
}