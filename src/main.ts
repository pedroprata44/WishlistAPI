import MainControler from "./infra/controller/MainControler";
import PgPromiseAdapter from "./infra/database/PgPromiseAdapter";
import ExpressAdapter from "./infra/http/ExpressAdapter";
import ClientRepositoryDatabase from "./infra/repository/clientRepositoryDatabase";
import CreateClient from "./application/usecases/CreateClient";

const httpServer = new ExpressAdapter()
const dbConnection = new PgPromiseAdapter()
const clientRepository = new ClientRepositoryDatabase(dbConnection)
const createClient = new CreateClient(clientRepository)
new MainControler(httpServer, createClient)
httpServer.listen(3000)