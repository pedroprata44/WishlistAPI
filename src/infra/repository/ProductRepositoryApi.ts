import axios from "axios";
import Product from "../../application/domain/Product";
import ProductRepository from "../../repository/ProductRepository";
import cacheConnection from "../cache/CacheConnection";

export default class ProductRepositoryApi implements ProductRepository{
    constructor(readonly client: cacheConnection){
        this.client = client
    }

    async getById(productId: string){
        const productFromCache = await this.client.get(productId)
        if(productFromCache){
            return JSON.parse(productFromCache) as Product
        }
        try{
            const responseGetProduct = await axios.get(`http://localhost:3001/products/${productId}`)
            const outputGetProduct = responseGetProduct.data
            const product = outputGetProduct[0] as Product
            await this.client.set(productId, JSON.stringify(product))
            return product
        } catch (e: any){
            throw new Error(`Error: ${e.message}`)
        }
    }
    
    async getProductById(productId: string): Promise<Product> {
        await this.client.init()
        const productFromCache = await this.client.get(productId)
        if(productFromCache){
            await this.client.quit()
            return JSON.parse(productFromCache) as Product
        }
        try{
            const responseGetProduct = await axios.get(`http://challenge-api.luizalabs.com/api/product/${productId}/`)
            const outputGetProduct = responseGetProduct.data
            const product = Product.restore(outputGetProduct.price, outputGetProduct.image, outputGetProduct.brand, outputGetProduct.id, outputGetProduct.title)
            await this.client.set(product.id, JSON.stringify(product))
            return product
        } catch(e: any){
            throw new Error("Product not found")
        }
    }

}