import CreateClient from "../src/usecases/CreateClient"
import GetClient from "../src/usecases/GetClient"

let createClient: CreateClient
let getClient: GetClient

beforeEach(() => {
    createClient = new CreateClient()
    getClient = new GetClient()
})

test("Should get a client", function(){
    const inputClient = {
        name: "client client",
        email: "client@client"
    }
    
    createClient.execute(inputClient)

    const outputGetClient = getClient.execute(inputClient.email)
    expect(outputGetClient.accountEmail).toBe(inputClient.email)
    expect(outputGetClient.accountName).toBe(inputClient.name)
})

test("Should not get a client not exists", function(){
    expect(() => getClient.execute(`client${Math.random()}@client`)).toThrow(new Error("Client not found"))
})