import AddProduct from "../src/application/usecases/AddProduct"
import CreateClient from "../src/application/usecases/CreateClient"
import GetProduct from "../src/application/usecases/GetProduct"
import GetWishlist from "../src/application/usecases/GetWishlist"
import ListProducts from "../src/application/usecases/ListProducts"
import cacheConnection from "../src/infra/cache/CacheConnection"
import redisAdapter from "../src/infra/cache/RedisAdapter"
import DatabaseConnection from "../src/infra/database/DatabaseConnection"
import PgPromiseAdapter from "../src/infra/database/PgPromiseAdapter"
import ClientRepositoryDatabase from "../src/infra/repository/ClientRepositoryDatabase"
import ProductRepositoryApi from "../src/infra/repository/ProductRepositoryApi"
import WishlistRepositoryDb from "../src/infra/repository/WishlistRepositoryDb"
import ClientRepository from "../src/repository/ClientRepository"
import ProductRepository from "../src/repository/ProductRepository"
import WishlistRepository from "../src/repository/WishlistRepository"

let dbConnection: DatabaseConnection
let cacheConnection: cacheConnection
let createClient: CreateClient
let clientRepository: ClientRepository
let productRepository: ProductRepository
let listProducts: ListProducts
let addProduct: AddProduct
let wishlistRepository: WishlistRepository
let getProduct: GetProduct
let getWishlist: GetWishlist

beforeEach(() => {
    dbConnection = new PgPromiseAdapter()
    cacheConnection = new redisAdapter()
    clientRepository = new ClientRepositoryDatabase(dbConnection)
    createClient = new CreateClient(clientRepository)
    productRepository = new ProductRepositoryApi(cacheConnection)
    listProducts = new ListProducts(productRepository)
    getProduct = new GetProduct(productRepository)
    wishlistRepository = new WishlistRepositoryDb(dbConnection, getProduct)
    addProduct = new AddProduct(clientRepository, wishlistRepository, productRepository)
    getWishlist = new GetWishlist(clientRepository, wishlistRepository)
})

test.only("Should get a existing wishlist", async function(){
    const inputClient = {
        name: "local host",
        email: `client${Math.random()}@client`
    }
    const outputCreateClient = await createClient.execute(inputClient)

    const page = await listProducts.execute("1")
    const productId = page[0].id

    await addProduct.execute(outputCreateClient.accountEmail, productId)
    const wishlist = await getWishlist.execute(outputCreateClient.accountEmail)
    const products = wishlist.products

    expect(products.find(product => product.id === productId)).toBeDefined() 
})

afterEach(async ()=>{
    await dbConnection.close()
    await cacheConnection.quit()
})