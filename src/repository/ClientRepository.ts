import Client from "../application/domain/Client";

export default interface ClientRepository{
    save(client: Client): Promise<void>
    update(clientEmail: string, client: Client): Promise<void>
    getByEmail(clientEmail: string): Promise<Client | undefined>
    remove(clientEmail: string): Promise<void>
}