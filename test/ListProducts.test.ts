import ListProducts from "../src/application/usecases/ListProducts"
import ProductRepositoryApi from "../src/infra/repository/ProductRepositoryApi"
import ProductRepository from "../src/repository/ProductRepository"

let listProducts: ListProducts
let productRepository: ProductRepository

beforeEach(() => {
    productRepository = new ProductRepositoryApi()
    listProducts = new ListProducts(productRepository)
})

test("Should return a list of products", async function(){
    const products = await listProducts.execute("1")
    expect(products).toBeDefined()
    
})