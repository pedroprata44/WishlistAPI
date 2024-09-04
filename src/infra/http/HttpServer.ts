export default interface HttpServer{
    register(method: string, url: string, callback: Function): void
    registerProtected(method: string, url: string, authentication: Function, callback: Function): void
    listen(port: string): void
}