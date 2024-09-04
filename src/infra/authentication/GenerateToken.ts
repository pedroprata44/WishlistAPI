import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'

export default class GenerateToken{
    private secret: any
    constructor(){
        dotenv.config()
        this.secret = process.env.SECRET_KEY
    }

    execute(payload: {accountName: string, accountEmail: string}, expiresIn: string = '1h'): string{
        return jwt.sign(payload, this.secret, {expiresIn})
    }
}