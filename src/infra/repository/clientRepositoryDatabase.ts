import Client from "../../domain/Client";
import ClientRepository from "../../repository/ClientRepository";
import DatabaseConnection from "../database/DatabaseConnection";

export default class ClientRepositoryDatabase implements ClientRepository{
    constructor(readonly connection: DatabaseConnection){
    }
    async save(client: Client) {
        await this.connection.query("insert into data.client (name, email) values ($1, $2)", [client.name.value, client.email.value])
    }
    async update(client: Client) {
        throw new Error("Method not implemented.");
    }
    async getByEmail(clientEmail: string): Promise<Client | undefined> {
        const [clientExisting] = await this.connection.query("select * from data.client where email = $1", [clientEmail])
        if(!clientExisting) return undefined
        return Client.restore(clientExisting.name, clientExisting.email)
    }
    async remove(clientEmail: string){
        throw new Error("Method not implemented.");
    }
}