import AddProduct from "../../application/usecases/AddProduct";
import CreateClient from "../../application/usecases/CreateClient";
import GetClient from "../../application/usecases/GetClient";
import GetProduct from "../../application/usecases/GetProduct";
import GetWishlist from "../../application/usecases/GetWishlist";
import HttpServer from "../http/HttpServer";

export default class MainControler{
    constructor(readonly httpServer: HttpServer, createClient: CreateClient, getClient: GetClient,   getWishlist: GetWishlist, getProduct: GetProduct, addProduct: AddProduct){
        this.httpServer.register("post", "/createclient", async function(params: any, body: any){
            const output = await createClient.execute(body)
            return output
        })
        this.httpServer.register("get", "/getclient/:email", async function(params: any, body: any){
            const output = await getClient.execute(params.email)
            return output
        })
        this.httpServer.register("post", "/addProduct/:email", async function (params: any, body: any) {
            const output = await addProduct.execute(params.email, body)
            return output
        })
        this.httpServer.register("get", "/getWishlist/:email", async function (params: any, body: any) {
            const output = await getWishlist.execute(params.email)
            return output
        })
        this.httpServer.register("get", "/getProduct/:id", async function (params: any, body: any){
            const output = await getProduct.execute(params.id)
            return output
        })
    }
}