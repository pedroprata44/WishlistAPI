import Client from "../domain/Client"
import { clients } from "../main"

export default class CreateClient{
    execute(input: Input): Output{
        if(clients.find(client => client.email.value === input.email)) throw new Error("This email already register")
        const client = new Client(input.name, input.email)
        clients.push(client)
        return {
            accountName: input.name,
            accountEmail: input.email
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