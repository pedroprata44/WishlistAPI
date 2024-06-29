import Client from "../domain/Client"

export default class CreateClient{
    execute(input: Input): Output{
        const client = new Client(input.name, input.email)
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