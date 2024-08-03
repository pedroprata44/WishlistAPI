import GetProduct from "../src/application/usecases/GetProduct"
import ListProducts from "../src/application/usecases/ListProducts"

let getProduct: GetProduct
let listProducts: ListProducts

beforeEach(() => {
    getProduct = new GetProduct()
    listProducts = new ListProducts()
})

test("Should get products by products ids", async function(){
    const productsPage = await listProducts.execute(1)
    const productsId: any[] = []
    for(const product of productsPage.slice(99)){
        productsId.push({product_id: product.id})
    }
    const products = await getProduct.execute(productsId)
    expect(products).toBeDefined()
})