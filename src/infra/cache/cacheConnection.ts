export default interface CacheConnection{
    init(): Promise<void>
    get(key: string): Promise<string>
    set(key: string, value: string): Promise<void>
    quit(): Promise<void>
}