import MainControler from "./infra/controller/MainControler";
import PgPromiseAdapter from "./infra/database/PgPromiseAdapter";
import ExpressAdapter from "./infra/http/ExpressAdapter";
import ClientRepositoryDb from "./infra/repository/ClientRepositoryDb";
import CreateClient from "./application/usecases/CreateClient";
import GetClient from "./application/usecases/GetClient";
import GetWishlist from "./application/usecases/GetWishlist";
import WishlistRepositoryDb from "./infra/repository/WishlistRepositoryDb";
import GetProduct from "./application/usecases/GetProduct";
import ProductRepositoryApi from "./infra/repository/ProductRepositoryApi";
import AddProduct from "./application/usecases/AddProduct";
import * as dotenv from 'dotenv'
import RedisAdapter from "./infra/cache/RedisAdapter";

dotenv.config()

const httpServer = new ExpressAdapter()
const dbConnection = new PgPromiseAdapter()
const cacheConnection = new RedisAdapter()
const clientRepository = new ClientRepositoryDb(dbConnection)
const createClient = new CreateClient(clientRepository)
const getClient = new GetClient(clientRepository)
const productRepository = new ProductRepositoryApi(cacheConnection)
const getProduct = new GetProduct(productRepository)
const wishlistRepository = new WishlistRepositoryDb(dbConnection, getProduct)
const getWishlist = new GetWishlist(clientRepository, wishlistRepository)
const addProduct = new AddProduct(clientRepository, wishlistRepository, productRepository)
new MainControler(httpServer, createClient, getClient, getWishlist, getProduct, addProduct)

const port = process.env.WISHLIST_PORT || "3000"
httpServer.listen(port)