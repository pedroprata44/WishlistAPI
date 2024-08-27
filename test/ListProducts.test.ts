import ListProducts from "../src/application/usecases/ListProducts"
import cacheConnection from "../src/infra/cache/cacheConnection"
import redisAdapter from "../src/infra/cache/redisAdapter"
import ProductRepositoryApi from "../src/infra/repository/ProductRepositoryApi"
import ProductRepository from "../src/repository/ProductRepository"

let cacheConnection: cacheConnection
let listProducts: ListProducts
let productRepository: ProductRepository

beforeEach(() => {
    cacheConnection = new redisAdapter()
    productRepository = new ProductRepositoryApi(cacheConnection)
    listProducts = new ListProducts(productRepository)
})

test("Should return a list of products", async function(){
    const products = await listProducts.execute("1")    
    expect(products).toBeDefined()
})

afterEach(async () => {
    await cacheConnection.quit()
})