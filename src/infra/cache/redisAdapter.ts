import CacheConnection from "./CacheConnection";
import {createClient} from 'redis'

export default class RedisAdapter implements CacheConnection{
    client: any
    constructor(){
        this.client = createClient()
    }
    async init(): Promise<void> {
        await this.client.connect()
    }
    async get(key: string): Promise<string> {
        this.init()
        const output = await this.client.get(key)
        this.quit()
        return output
    }
    async set(key: string, value: string): Promise<void> {
        this.init()
        await this.client.setEx(key, 3600, value)
        this.quit()
    }
    async quit(): Promise<void> {
        await this.client.quit()
    }
}