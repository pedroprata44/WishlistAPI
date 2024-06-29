import Client from "../domain/Client"
import { clientsEmail } from "../domain/main"

export default class CreateClient{
    execute(input: Input): Output{
        if(clientsEmail.includes(input.email)) throw new Error("This email already register")
        const client = new Client(input.name, input.email)
        clientsEmail.push(client.email.value)
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