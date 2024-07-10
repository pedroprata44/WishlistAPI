import CreateClient from "../../application/usecases/CreateClient";
import HttpServer from "../http/HttpServer";

export default class MainControler{
    constructor(readonly httpServer: HttpServer, createClient: CreateClient){
        this.httpServer.register("post", "/createclient", async function(params: any, body: any){
            const output = await createClient.execute(body)
            return output
        })
    }
}