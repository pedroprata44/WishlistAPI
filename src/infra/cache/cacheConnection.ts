export default interface cacheConnection{
    init(): Promise<void>
    get(key: string): Promise<string>
    set(key: string, value: string): Promise<void>
    quit(): Promise<void>
}