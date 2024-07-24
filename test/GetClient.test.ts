import DatabaseConnection from "../src/infra/database/DatabaseConnection"
import PgPromiseAdapter from "../src/infra/database/PgPromiseAdapter"
import ClientRepositoryDatabase from "../src/infra/repository/clientRepositoryDatabase"
import ClientRepository from "../src/repository/ClientRepository"
import CreateClient from "../src/application/usecases/CreateClient"
import GetClient from "../src/application/usecases/GetClient"

let databaseConnection: DatabaseConnection
let clientRepository: ClientRepository
let createClient: CreateClient
let getClient: GetClient

beforeEach(() => {
    databaseConnection = new PgPromiseAdapter()
    clientRepository = new ClientRepositoryDatabase(databaseConnection)
    createClient = new CreateClient(clientRepository)
    getClient = new GetClient(clientRepository)
})

test("Should get a client", async function(){
    const inputClient = {
        name: "client client",
        email: `client${Math.random()}@client`
    }
    
    await createClient.execute(inputClient)

    const outputGetClient = await getClient.execute(inputClient.email)
    expect(outputGetClient.accountEmail).toBe(inputClient.email)
    expect(outputGetClient.accountName).toBe(inputClient.name)
})

test("Should not get a client not existing", async function(){
    await expect(() => getClient.execute(`client${Math.random()}@client`)).rejects.toThrow(new Error("Client not found"))
})

afterEach(async () => {
    await databaseConnection.close()
})