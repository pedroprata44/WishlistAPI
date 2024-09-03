import express, { Request, Response } from 'express'
import { products } from './Products'
import * as dotenv from 'dotenv'

dotenv.config()
const port = process.env.PRODUCTS_PORT

const app = express()
app.use(express.json())

app.get("/products/:id", (req: Request, res: Response) => {
    const productId = req.params.id
    const product = products.filter(product => product.id === productId)
    if(product.length === 0) res.sendStatus(404).json("Product not found")
    res.json(product)
})
app.listen(port)