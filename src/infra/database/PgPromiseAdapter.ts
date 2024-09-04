import DatabaseConnection from "./DatabaseConnection";
import pgp from "pg-promise"
import dotenv from 'dotenv'

dotenv.config()

export default class PgPromiseAdapter implements DatabaseConnection{
    connection: any
    postgresUser: string
    postgresPassword: string
    postgresServer: string
    postgresPort: string
    constructor(){
        this.postgresUser = process.env.POSTGRES_USER || "postgres"
        this.postgresPassword = process.env.POSTGRES_PASSWORD || "password"
        this.postgresServer = process.env.POSTGRES_SERVER || "wishlist"
        this.postgresPort = process.env.POSTGRES_PORT || "5432"

        this.connection = pgp()(`postgres://${this.postgresUser}:${this.postgresPassword}@localhost:${this.postgresPort}/${this.postgresServer}`)
    }
    query(statement: string, params: any): Promise<any> {
        return this.connection.query(statement, params)
    }
    async close(): Promise<void> {
        await this.connection.$pool.end()
    }
}