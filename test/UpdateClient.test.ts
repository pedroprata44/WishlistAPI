import DatabaseConnection from "../src/infra/database/DatabaseConnection"
import PgPromiseAdapter from "../src/infra/database/PgPromiseAdapter"
import ClientRepositoryDatabase from "../src/infra/repository/clientRepositoryDatabase"
import ClientRepository from "../src/repository/ClientRepository"
import CreateClient from "../src/usecases/CreateClient"
import GetClient from "../src/usecases/GetClient"
import UpdateClient from "../src/usecases/UpdateClient"

let databaseConnection: DatabaseConnection
let clientRepository: ClientRepository
let createClient: CreateClient
let getClient: GetClient
let updateClient: UpdateClient

beforeEach(() => {
    databaseConnection = new PgPromiseAdapter()
    clientRepository = new ClientRepositoryDatabase(databaseConnection)
    createClient = new CreateClient(clientRepository)
    getClient = new GetClient(clientRepository)
    updateClient = new UpdateClient(clientRepository)
})

test("Should update a client", async function (){
    const inputClient = {
        name: "client client",
        email: `client${Math.random()}@client`
    }
    await createClient.execute(inputClient)

    const inputClient2 = {
        name: "client c",
        email: `client${Math.random()}@client`
    }
    await updateClient.execute(inputClient.email, inputClient2)
    
    const outputGetClient = await getClient.execute(inputClient2.email)
    expect(outputGetClient.accountEmail).toBeDefined()
    expect(outputGetClient.accountName).toBe(inputClient2.name)
})

test("Should not update a client with a email that not exists", async function (){
    const inputClient2 = {
        name: "client c",
        email: `client${Math.random()}@client`
    }
    await expect(updateClient.execute(inputClient2.email, inputClient2)).rejects.toThrow(new Error("Client not found"))
})

afterEach(() => {
    databaseConnection.close()
})