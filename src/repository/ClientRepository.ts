import Client from "../domain/Client";

export default interface ClientRepository{
    save(client: Client): Promise<void>
    update(client: Client): Promise<void>
    getByEmail(clientEmail: string): Promise<Client | undefined>
    remove(clientEmail: string): Promise<void>
}