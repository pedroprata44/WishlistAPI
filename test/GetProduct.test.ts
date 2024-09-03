import GetProduct from "../src/application/usecases/GetProduct"
import CacheConnection from "../src/infra/cache/CacheConnection"
import redisAdapter from "../src/infra/cache/RedisAdapter"
import ProductRepositoryApi from "../src/infra/repository/ProductRepositoryApi"
import ProductRepository from "../src/repository/ProductRepository"

let cacheConnection: CacheConnection
let productRepository: ProductRepository
let getProduct: GetProduct

beforeEach(async () => {
    cacheConnection = new redisAdapter()
    productRepository = new ProductRepositoryApi(cacheConnection)
    getProduct = new GetProduct(productRepository)

    await cacheConnection.init()
})

test("Should get a product by id", async function(){
    const productId = "2"
    const product = await getProduct.execute(productId)
    expect(product.id).toBe(productId)
})

afterEach(async () => {
    await cacheConnection.quit()
})