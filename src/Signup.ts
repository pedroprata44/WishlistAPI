import Client from "./Client"

export default class Signup{
    execute(input: Input): Output{
        const client = new Client(input.name, input.email)
        return {
            accountEmail: input.email
        }
    }
}
type Input = {
    name: string,
    email: string
}
type Output = {
    accountEmail: string
}