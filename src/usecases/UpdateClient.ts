import Client from "../domain/Client"
import { clients } from "../main"

export default class UpdateClient{
    execute(email: string, updateClient: Client){
        const index = clients.findIndex(client => client.email.value === email)
        if(index === -1) throw new Error("Client not found")
        const existingClient = clients.findIndex(client => client.email.value === updateClient.email.value)
        if(existingClient != -1) throw new Error("This email already register")
        clients[index] = updateClient
    }
}