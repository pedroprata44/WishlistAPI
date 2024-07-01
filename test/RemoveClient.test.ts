import CreateClient from "../src/usecases/CreateClient"
import GetClient from "../src/usecases/GetClient"
import RemoveClient from "../src/usecases/RemoveClient"

let createClient: CreateClient
let getClient: GetClient
let removeClient: RemoveClient

beforeEach(() => {
    createClient = new CreateClient()
    getClient = new GetClient()
    removeClient = new RemoveClient()
})

test("Should remove a client", function(){
    const inputClient = {
        name: "client client",
        email: `client${Math.random()}@client`
    }
    createClient.execute(inputClient)
    removeClient.execute(inputClient.email)
    expect(() => getClient.execute(inputClient.email)).toThrow(new Error("Client not found"))
})