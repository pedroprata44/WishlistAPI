import DatabaseConnection from "../src/infra/database/DatabaseConnection"
import PgPromiseAdapter from "../src/infra/database/PgPromiseAdapter"
import ClientRepository from "../src/repository/ClientRepository"
import CreateClient from "../src/application/usecases/CreateClient"
import ClientRepositoryDatabase from "../src/infra/repository/clientRepositoryDatabase"

let createClient: CreateClient
let clientRepository: ClientRepository
let databaseConnection: DatabaseConnection

beforeEach(() => {
    databaseConnection = new PgPromiseAdapter()
    clientRepository = new ClientRepositoryDatabase(databaseConnection)
    createClient = new CreateClient(clientRepository)
})
test("Should create a client", async function(){
    const inputClient = {
        name: "client client",
        email: `client${Math.random()}@client`
    }
    const outputCreateClient = await createClient.execute(inputClient)
    expect(outputCreateClient.accountName).toBe(inputClient.name)
    expect(outputCreateClient.accountEmail).toBe(inputClient.email)
})
test("Should not create a client with a email already exists", async function(){
    const inputClient = {
        name: "client client",
        email: `client${Math.random()}@client`
    }
    await createClient.execute(inputClient)
    await expect(() => createClient.execute(inputClient)).rejects.toThrow(new Error("This email already register"))
})

afterEach(async () => {
    await databaseConnection.close()
})