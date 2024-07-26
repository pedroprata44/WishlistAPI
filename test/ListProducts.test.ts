import ListProducts from "../src/application/usecases/ListProducts"

let listProducts: ListProducts

beforeEach(() => {
    listProducts = new ListProducts()
})

test("Should return a list of products", async function(){
    const products = await listProducts.execute(1)
    expect(products).toBeDefined()
})