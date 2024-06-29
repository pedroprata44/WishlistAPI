import { clientsEmail } from "../src/domain/main"
import CreateClient from "../src/usecases/CreateClient"

let createClient: CreateClient

beforeEach(() => {
    createClient = new CreateClient()
})

test("Should create a client", function(){
    const inputClient = {
        name: "client client",
        email: "client@client"
    }
    const outputCreateClient = createClient.execute(inputClient)
    expect(outputCreateClient.accountName).toBe(inputClient.name)
    expect(outputCreateClient.accountEmail).toBe(inputClient.email)
})

test("Should not create a client with a email already exists", function(){
    const inputClient = {
        name: "client client",
        email: `client${Math.random()}@client`
    }
    createClient.execute(inputClient)
    expect(() => createClient.execute(inputClient)).toThrow(new Error("This email already register"))
})