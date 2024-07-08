import express, { Request, Response } from "express";
import CreateClient from "../usecases/CreateClient";
import ClientRepositoryDatabase from "./repository/clientRepositoryDatabase";
import PgPromiseAdapter from "./database/PgPromiseAdapter";
import GetClient from "../usecases/GetClient";

const app = express()
app.use(express.json())

app.post("/createclient", async function(req: Request, res: Response){
    const input = req.body
    const dbConnection = new PgPromiseAdapter()
    const clientRepository = new ClientRepositoryDatabase(dbConnection)
    const createClient = new CreateClient(clientRepository)

    const output = await createClient.execute(input)
    res.json(output)
})

app.get("/getclient/:email", async function (req: Request, res: Response){
    const email = req.params.email
    const dbConnection = new PgPromiseAdapter()
    const clientRepository = new ClientRepositoryDatabase(dbConnection)
    const getClient = new GetClient(clientRepository)

    const output = await getClient.execute(email)
    res.json(output)
})

app.listen(3000)