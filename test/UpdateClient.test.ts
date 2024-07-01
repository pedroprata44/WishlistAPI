import Client from "../src/domain/Client"
import CreateClient from "../src/usecases/CreateClient"
import GetClient from "../src/usecases/GetClient"
import UpdateClient from "../src/usecases/UpdateClient"

let createClient: CreateClient
let getClient: GetClient
let updateClient : UpdateClient

beforeEach(() => {
    createClient = new CreateClient()
    getClient = new GetClient()
    updateClient = new UpdateClient()
})

test("Should update a client", function(){
    const inputClient = {
        name: "client client",
        email: "client@client"
    }
    createClient.execute(inputClient)
    const inputUpdateClient = {
        name: "c c",
        email: `client${Math.random()}@client`
    }
    updateClient.execute(inputClient.email, new Client(inputUpdateClient.name, inputUpdateClient.email))

    const outputGetClient = getClient.execute(inputUpdateClient.email)
    expect(outputGetClient.accountName).toBe(inputUpdateClient.name)
    expect(outputGetClient.accountEmail).toBe(inputUpdateClient.email)
})

test("Should not update a client that not exists", function(){
    expect(() => updateClient.execute("", new Client("client client", ".@."))).toThrow(new Error("Client not found"))
})

test("Should not update a client with a email already exists", function(){
    const inputClient = {
        name: "c c",
        email: `client${Math.random()}@client`
    }
    createClient.execute(inputClient)

    const inputClient2 = {
        name: "c c",
        email: `client${Math.random()}@client`
    }
    createClient.execute(inputClient2)

    expect(() => updateClient.execute(inputClient2.email, new Client(inputClient.name, inputClient.email))).toThrow(new Error("This email already register"))
})