import Client from "../domain/Client";

export default interface ClientRepository{
    save(client: Client): void
    update(client: Client): void
    getByEmail(clientEmail: string): Promise<Client | undefined>
    remove(clientEmail: string): void
}