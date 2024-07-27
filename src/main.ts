import MainControler from "./infra/controller/MainControler";
import PgPromiseAdapter from "./infra/database/PgPromiseAdapter";
import ExpressAdapter from "./infra/http/ExpressAdapter";
import ClientRepositoryDatabase from "./infra/repository/ClientRepositoryDatabase";
import CreateClient from "./application/usecases/CreateClient";
import GetClient from "./application/usecases/GetClient";

const httpServer = new ExpressAdapter()
const dbConnection = new PgPromiseAdapter()
const clientRepository = new ClientRepositoryDatabase(dbConnection)
const createClient = new CreateClient(clientRepository)
const getClient = new GetClient(clientRepository)
new MainControler(httpServer, createClient, getClient)
httpServer.listen(3000)