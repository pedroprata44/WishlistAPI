import { NextFunction } from "express";
import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
dotenv.config()

export default class AuthenticateToken{
    authenticateToken(req: any, res: any, next: NextFunction){
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]

        if(token == null) return res.sendStatus(401)

        jwt.verify(token, process.env.SECRET_KEY || "", (err: any, client: any) => {
            if(err) res.sendStatus(401)
            req.body.client = client
            next()
        })
    }
}