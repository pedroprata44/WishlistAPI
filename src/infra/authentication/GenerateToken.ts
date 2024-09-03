import jwt from 'jsonwebtoken'
import Client from '../../application/domain/Client'
import * as dotenv from 'dotenv'

export default class GenerateToken{
    private secret: any
    constructor(){
        dotenv.config()
        this.secret = process.env.SECRET_KEY
    }

    execute(payload: Client, expiresIn: string = '1h'): string{
        return jwt.sign(payload, this.secret, {expiresIn})
    }
}