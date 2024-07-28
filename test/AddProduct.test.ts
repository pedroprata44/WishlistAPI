import AddProduct from "../src/application/usecases/AddProduct"
import CreateClient from "../src/application/usecases/CreateClient"
import GetWishList from "../src/application/usecases/GetWishlist"
import ListProducts from "../src/application/usecases/ListProducts"
import DatabaseConnection from "../src/infra/database/DatabaseConnection"
import PgPromiseAdapter from "../src/infra/database/PgPromiseAdapter"
import ClientRepositoryDatabase from "../src/infra/repository/ClientRepositoryDatabase"
import WishlistRepositoryDb from "../src/infra/repository/WishlistRepositoryDb"
import ClientRepository from "../src/repository/ClientRepository"
import WishlistRepository from "../src/repository/WishlistRepository"

let addProduct: AddProduct
let listProducts: ListProducts
let wishlistRepository: WishlistRepository
let getWishList: GetWishList
let dbConnection: DatabaseConnection
let clientRepository: ClientRepository
let createClient: CreateClient

beforeEach(() => {
    dbConnection = new PgPromiseAdapter()
    // clientRepository = new ClientRepositoryDatabase(dbConnection)
    // createClient = new CreateClient(clientRepository)
    // addProduct = new AddProduct()
    // listProducts = new ListProducts()
    // wishlistRepository = new WishlistRepositoryDb(dbConnection)
    // getWishList = new GetWishList(wishlistRepository)
})

test.only("test", async function(){
    const output = await dbConnection.query("select * from data.wishlist", [])
    console.log(output)
})

test("Should add a product to wishlist", async function(){
    
    //signup
    const inputSignup = {
        name: "client client",
        email: `client${Math.random()}@client`
    }
    const outputCreateClient = await createClient.execute(inputSignup)
    const clientEmail = outputCreateClient.accountEmail
    
    //list, takes id and add to wishlist
    const page = await listProducts.execute(1)
    const productId = page[0].id
    await addProduct.execute(clientEmail, "1", productId)

    //get wishlist
    // const list = await getWishList.execute(clientEmail)
    // const findProduct = list.find((list: any) => list.id === productId)
    // expect(findProduct).toBeDefined()
})

afterEach(async () => {
    await dbConnection.close()
})