import AddProduct from "../../application/usecases/AddProduct";
import CreateClient from "../../application/usecases/CreateClient";
import GetClient from "../../application/usecases/GetClient";
import GetProduct from "../../application/usecases/GetProduct";
import GetWishlist from "../../application/usecases/GetWishlist";
import HttpServer from "../http/HttpServer";
import GenerateToken from "../authentication/GenerateToken";
import AuthenticateToken from "../authentication/AuthenticateToken";
import UpdateClient from "../../application/usecases/UpdateClient";
import RemoveClient from "../../application/usecases/RemoveClient";

export default class MainControler{
    constructor(readonly removeclient: RemoveClient, readonly updateClient: UpdateClient, readonly authenticateToken: AuthenticateToken, readonly generateToken: GenerateToken, readonly httpServer: HttpServer, createClient: CreateClient, getClient: GetClient,   getWishlist: GetWishlist, getProduct: GetProduct, addProduct: AddProduct){
        this.httpServer.register("post", "/createclient", async function(params: any, body: any){
            const outputCreateClient = await createClient.execute(body)
            const token = generateToken.execute(outputCreateClient)
            return token
        })
        this.httpServer.registerProtected("get", "/getclient/:email", this.authenticateToken.authenticateToken, async function(params: any, body: any){
            const output = await getClient.execute(params.email)
            return output
        })
        this.httpServer.registerProtected("post", "/updateclient/:email", this.authenticateToken.authenticateToken, async function(params: any, body: any){
            const output = await updateClient.execute(params.email, body)
            return output
        })
        this.httpServer.registerProtected("post", "/removeclient/:email", this.authenticateToken.authenticateToken, async function(params: any, body: any){
            const output = await removeclient.execute(params.email)
            return output
        })
        this.httpServer.registerProtected("post", "/addproduct/:email", this.authenticateToken.authenticateToken, async function (params: any, body: any) {
            const output = await addProduct.execute(params.email, body.productId)
            return output
        })
        this.httpServer.registerProtected("get", "/getwishlist/:email", this.authenticateToken.authenticateToken, async function (params: any, body: any) {
            const output = await getWishlist.execute(params.email)
            return output
        })
        this.httpServer.registerProtected("get", "/getproduct/:id", this.authenticateToken.authenticateToken, async function (params: any, body: any){
            const output = await getProduct.execute(params.id)
            return output
        })
    }
}