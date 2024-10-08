import express from "express"
import HttpServer from "./HttpServer"

export default class ExpressAdapter implements HttpServer{
    app: any
    constructor(){
        this.app = express()
        this.app.use(express.json())
    }
    register(method: string, url: string, callback: Function){
        this.app[method](url, async function (req: any, res: any) {
            try{
                const output = await callback(req.params, req.body)
                res.json(output)
            } catch(e: any){
                res.status(422).json({
                    message: e.message
                })
            }
        })
    }
    registerProtected(method: string, url: string, authentication: Function, callback: Function){
        this.app[method](url, authentication, async function (req: any, res: any){
            try{
                const output = await callback(req.params, req.body)
                res.json(output)
            } catch(e: any){
                res.status(422).json({
                    message: e.message
                })
            }
        })
    }
    listen(port: string){
        this.app.listen(port)
    }
}