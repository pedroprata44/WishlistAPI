import AddProduct from "../src/application/usecases/AddProduct"
import CreateClient from "../src/application/usecases/CreateClient"
import ListProducts from "../src/application/usecases/ListProducts"
import DatabaseConnection from "../src/infra/database/DatabaseConnection"
import PgPromiseAdapter from "../src/infra/database/PgPromiseAdapter"
import ClientRepositoryDatabase from "../src/infra/repository/ClientRepositoryDatabase"
import WishlistRepositoryDb from "../src/infra/repository/WishlistRepositoryDb"
import ClientRepository from "../src/repository/ClientRepository"
import WishlistRepository from "../src/repository/WishlistRepository"

let dbConnection: DatabaseConnection
let createClient: CreateClient
let clientRepository: ClientRepository
let wishlistRepository: WishlistRepository
let addProduct: AddProduct
let listProducts: ListProducts

beforeEach(() => {
    dbConnection = new PgPromiseAdapter()
    clientRepository = new ClientRepositoryDatabase(dbConnection)
    createClient = new CreateClient(clientRepository)
    wishlistRepository = new WishlistRepositoryDb(dbConnection)
    addProduct = new AddProduct(clientRepository, wishlistRepository)
    listProducts = new ListProducts()
})

test("Should add a product to wishlist", async function(){
    const inputClient = {
        name: "client client",
        email: `client${Math.random()}@client`
    }
    const outputCreateClient = await createClient.execute(inputClient)


    const products = await listProducts.execute(5)
    const productId = products[5].id

    await addProduct.execute(outputCreateClient.accountEmail, productId)
})

afterEach(async () => {
    await dbConnection.close()
})