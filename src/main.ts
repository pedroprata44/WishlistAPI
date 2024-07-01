import Client from "./domain/Client";

export let clients: Client[] = []

export function removeClient(email: string){
    clients = clients.filter(client => client.email.value != email)
}