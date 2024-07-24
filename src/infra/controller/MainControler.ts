import CreateClient from "../../application/usecases/CreateClient";
import GetClient from "../../application/usecases/GetClient";
import HttpServer from "../http/HttpServer";

export default class MainControler{
    constructor(readonly httpServer: HttpServer, createClient: CreateClient, getClient: GetClient){
        this.httpServer.register("post", "/createclient", async function(params: any, body: any){
            const output = await createClient.execute(body)
            return output
        })
        this.httpServer.register("get", "/getclient/:email", async function(params: any, body: any){
            const output = await getClient.execute(params.email)
            return output
        })
    }
}