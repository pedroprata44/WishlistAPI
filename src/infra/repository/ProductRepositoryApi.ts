import axios from "axios";
import Product from "../../application/domain/Product";
import ProductRepository from "../../repository/ProductRepository";
import cacheConnection from "../cache/cacheConnection";

export default class ProductRepositoryApi implements ProductRepository{
    constructor(readonly client: cacheConnection){
        this.client = client
    }
    async getProductsByPageNumber(pageNumber: string): Promise<Product[]> {
        await this.client.init()
        const pageFromClient = await this.client.get(pageNumber)
        if(pageFromClient){
            await this.client.quit()
            return JSON.parse(pageFromClient) as Product[]
        }
        try{
            const responseGetPage= await axios.get(`http://challenge-api.luizalabs.com/api/product/?page=${pageNumber}`)
            const outputGetPage = responseGetPage.data
            const products = outputGetPage.products
            await this.client.set(pageNumber, JSON.stringify(products))
            return products
        } catch (e: any){
            if(e.response.status === 400){
                throw new Error("Product not found")
            }
            throw new Error(`unexpected error: ${e}`)
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