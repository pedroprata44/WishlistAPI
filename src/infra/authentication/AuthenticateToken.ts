import { NextFunction } from "express";
import jwt from 'jsonwebtoken'

export default class AuthenticateToken{
    secret: any
    constructor(){
        this.secret = process.env.SECRET_KEY
    }

    authenticateToken(req: any, res: any, next: NextFunction){
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]

        if(token == null) return res.sendStatus(401)

        jwt.verify(token, this.secret, (err: any, client: any) => {
            if(err) res.sendStatus(401)
            req.client = client
            next()
        })
    }
}