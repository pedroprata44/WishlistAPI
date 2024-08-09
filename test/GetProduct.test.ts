import GetProduct from "../src/application/usecases/GetProduct"
import ListProducts from "../src/application/usecases/ListProducts"
import ProductRepositoryApi from "../src/infra/repository/ProductRepositoryApi"
import ProductRepository from "../src/repository/ProductRepository"

let productRepository: ProductRepository
let getProduct: GetProduct
let listProducts: ListProducts

beforeEach(() => {
    productRepository = new ProductRepositoryApi()
    listProducts = new ListProducts(productRepository)
    getProduct = new GetProduct(productRepository)
})

test("Should get a product by id", async function(){
    const pageNumber = "1"
    const page = await listProducts.execute(pageNumber)
    const productId = page[0].id

    const product = await getProduct.execute(productId)
    expect(product.id).toBe(productId)
    expect(product.brand).toBe(page[0].brand)
})