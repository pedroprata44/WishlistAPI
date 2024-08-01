import AddProduct from "../src/application/usecases/AddProduct"
import CreateClient from "../src/application/usecases/CreateClient"
import GetWishlist from "../src/application/usecases/GetWishlist"
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
let getWishlist: GetWishlist
let addProduct: AddProduct
let listProducts: ListProducts

beforeEach(() => {
    dbConnection = new PgPromiseAdapter()
    clientRepository = new ClientRepositoryDatabase(dbConnection)
    createClient = new CreateClient(clientRepository)
    wishlistRepository = new WishlistRepositoryDb(dbConnection)
    getWishlist = new GetWishlist(clientRepository, wishlistRepository)
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

    const wishlist = await getWishlist.execute(outputCreateClient.accountEmail)
    expect(wishlist.productsId.find(product => product.product_id === productId)).toBeDefined()

})

test("Should not add a product does not exists", async function(){
    const inputClient = {
        name: "client client",
        email: `client${Math.random()}@client`
    }
    const outputCreateClient = await createClient.execute(inputClient)
    const productId = crypto.randomUUID()
    await expect(addProduct.execute(outputCreateClient.accountEmail, productId)).rejects.toThrow(new Error("Product not found"))
})

afterEach(async () => {
    await dbConnection.close()
})