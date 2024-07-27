import AddProduct from "../src/application/usecases/AddProduct"
import CreateClient from "../src/application/usecases/CreateClient"
import GetWishList from "../src/application/usecases/GetWishlist"
import ListProducts from "../src/application/usecases/ListProducts"
import DatabaseConnection from "../src/infra/database/DatabaseConnection"
import PgPromiseAdapter from "../src/infra/database/PgPromiseAdapter"
import ClientRepositoryDatabase from "../src/infra/repository/clientRepositoryDatabase"
import ClientRepository from "../src/repository/ClientRepository"

let addProduct: AddProduct
let listProducts: ListProducts
let getWishList: GetWishList
let dbConnection: DatabaseConnection
let clientRepository: ClientRepository
let createClient: CreateClient

beforeEach(() => {
    dbConnection = new PgPromiseAdapter()
    clientRepository = new ClientRepositoryDatabase(dbConnection)
    createClient = new CreateClient(clientRepository)
    addProduct = new AddProduct()
    listProducts = new ListProducts()
    getWishList = new GetWishList()
})

test("Should add a product to wishlist", async function(){
    
    //signup

    const inputSignup = {
        name: "client client",
        email: `client${Math.random()}@client`
    }
    const outputCreateClient = await createClient.execute(inputSignup)
    const clientEmail = outputCreateClient.accountEmail
    
    const page = await listProducts.execute(1)
    const productId = page[0].id
    await addProduct.execute(clientEmail, "1", productId)

    const list = await getWishList.execute(clientEmail)
    const findProduct = list.find((list: any) => list.id === productId)
    expect(findProduct).toBeDefined()
})