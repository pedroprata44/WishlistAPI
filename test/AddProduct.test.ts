import AddProduct from "../src/application/usecases/AddProduct"
import CreateClient from "../src/application/usecases/CreateClient"
import GetProduct from "../src/application/usecases/GetProduct"
import GetWishlist from "../src/application/usecases/GetWishlist"
import CacheConnection from "../src/infra/cache/CacheConnection"
import RedisAdapter from "../src/infra/cache/RedisAdapter"
import DatabaseConnection from "../src/infra/database/DatabaseConnection"
import PgPromiseAdapter from "../src/infra/database/PgPromiseAdapter"
import ClientRepositoryDb from "../src/infra/repository/ClientRepositoryDb"
import ProductRepositoryApi from "../src/infra/repository/ProductRepositoryApi"
import WishlistRepositoryDb from "../src/infra/repository/WishlistRepositoryDb"
import ClientRepository from "../src/repository/ClientRepository"
import ProductRepository from "../src/repository/ProductRepository"
import WishlistRepository from "../src/repository/WishlistRepository"

let dbConnection: DatabaseConnection
let cacheConnection: CacheConnection
let createClient: CreateClient
let clientRepository: ClientRepository
let wishlistRepository: WishlistRepository
let productRepository: ProductRepository
let addProduct: AddProduct
let getProduct: GetProduct

beforeEach(() => {
    dbConnection = new PgPromiseAdapter()
    cacheConnection = new RedisAdapter()
    clientRepository = new ClientRepositoryDb(dbConnection)
    createClient = new CreateClient(clientRepository)
    productRepository = new ProductRepositoryApi(cacheConnection)
    getProduct = new GetProduct(productRepository)
    wishlistRepository = new WishlistRepositoryDb(dbConnection, getProduct)
    addProduct = new AddProduct(clientRepository, wishlistRepository, productRepository)

    cacheConnection.init()
})

test("Should add a product to client wishlist", async function(){
    const inputClient = {
        name: "client client",
        email: `client${Math.random()}@client`
    }
    const outputCreateClient = await createClient.execute(inputClient)
    const productId = "1"

    await addProduct.execute(outputCreateClient.accountEmail, productId)
    const getProductInWishlist = await wishlistRepository.getProductInWishlist(outputCreateClient.accountEmail, productId)
    expect(getProductInWishlist.length).toBe(1)


})

test("Should not add a product does not exists", async function(){
    const inputClient = {
        name: "client client",
        email: `client${Math.random()}@client`
    }
    const outputCreateClient = await createClient.execute(inputClient)
    const productId = crypto.randomUUID()
    await expect(() => addProduct.execute(outputCreateClient.accountEmail, productId)).rejects.toThrow(new Error("Product not found"))
})

test("Should not add a product already exists in client wishlist", async function() {
    const inputClient = {
        name: "client client",
        email: `client${Math.random()}@client`
    }
    const outputCreateClient = await createClient.execute(inputClient)
    const productId = "1"
    await addProduct.execute(outputCreateClient.accountEmail, productId)
    await expect(() => addProduct.execute(outputCreateClient.accountEmail, productId)).rejects.toThrow(new Error("This product already includes in wishlist"))
})

afterEach(async () => {
    await dbConnection.close()
    await cacheConnection.quit()
})