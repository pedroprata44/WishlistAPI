import express, { Request, Response } from 'express'
import { products } from './Products'

const app = express()

app.get("/products/:id", (req: Request, res: Response) => {
    const productId = req.params.id
    const product = products.filter(product => product.id === productId)
    if(product.length === 0) res.sendStatus(404).json("Product not found")
    res.json(product)
})

app.listen(3001)