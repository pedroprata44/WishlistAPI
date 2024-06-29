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