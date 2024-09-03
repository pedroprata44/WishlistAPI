import DatabaseConnection from "../src/infra/database/DatabaseConnection"
import PgPromiseAdapter from "../src/infra/database/PgPromiseAdapter"
import ClientRepository from "../src/repository/ClientRepository"
import CreateClient from "../src/application/usecases/CreateClient"
import GetClient from "../src/application/usecases/GetClient"
import RemoveClient from "../src/application/usecases/RemoveClient"
import ClientRepositoryDatabase from "../src/infra/repository/clientRepositoryDatabase"

let databaseConnection: DatabaseConnection
let clientRepository: ClientRepository
let createClient: CreateClient
let getClient: GetClient
let removeClient: RemoveClient

beforeEach(() => {
    databaseConnection = new PgPromiseAdapter()
    clientRepository = new ClientRepositoryDatabase(databaseConnection)
    createClient = new CreateClient(clientRepository)
    getClient = new GetClient(clientRepository)
    removeClient = new RemoveClient(clientRepository)
})

test("Should remove a client", async function (){
    const inputClient = {
        name: "client client",
        email: `client${Math.random()}@client`
    }
    const client = await createClient.execute(inputClient)
    await removeClient.execute(client.accountEmail)

    await expect(() => getClient.execute(client.accountEmail)).rejects.toThrow(new Error("Client not found"))
})

test("Should not remove a client that not exists", async function(){
    await expect(() => removeClient.execute(`client${Math.random()}@client`)).rejects.toThrow(new Error("Client not found"))
})

afterEach(async () => {
    await databaseConnection.close()
})