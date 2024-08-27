import cacheConnection from "./cacheConnection";
import {createClient} from 'redis'

export default class redisAdapter implements cacheConnection{
    client: any
    constructor(){
        this.client = createClient()
    }
    async init(): Promise<void> {
        await this.client.connect()
    }
    async get(key: string): Promise<string> {
        const output = await this.client.get(key)
        return output
    }
    async set(key: string, value: string): Promise<void> {
        await this.client.set(key, value)
    }
    async quit(): Promise<void> {
        await this.client.quit()
    }
}