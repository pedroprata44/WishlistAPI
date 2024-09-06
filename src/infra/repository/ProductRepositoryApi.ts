import axios from "axios";
import Product from "../../application/domain/Product";
import ProductRepository from "../../repository/ProductRepository";
import cacheConnection from "../cache/CacheConnection";
import * as dotenv from 'dotenv'

dotenv.config()

export default class ProductRepositoryApi implements ProductRepository{
    constructor(readonly client: cacheConnection){
        this.client = client
    }
    async getById(productId: string){
        const productFromCache = await this.client.get(productId)
        if(productFromCache) return JSON.parse(productFromCache) as Product

        const responseGetProduct = await axios.get(`http://localhost:${process.env.PRODUCTS_PORT}/products/${productId}`)
        const outputGetProduct = responseGetProduct.data
        
        if(outputGetProduct === "Product not found") throw new Error("Product not found")
        const product = outputGetProduct[0] as Product
        await this.client.set(productId, JSON.stringify(product))
        return product
    }
}