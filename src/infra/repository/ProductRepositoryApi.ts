import axios from "axios";
import Product from "../../application/domain/Product";
import ProductRepository from "../../repository/ProductRepository";
import {createClient} from "redis"

export default class ProductRepositoryApi implements ProductRepository{

    async getProductsByPageNumber(pageNumber: string): Promise<Product[]> {
        const client = createClient()
        await client.connect()

        const pageFromClient = await client.get(pageNumber)
        if(pageFromClient){
            await client.quit()
            return JSON.parse(pageFromClient) as Product[]
        }
        try{
            const responseGetPage= await axios.get(`http://challenge-api.luizalabs.com/api/product/?page=${pageNumber}`)
            const outputGetPage = responseGetPage.data
            const products = outputGetPage.products
            await client.set(pageNumber, JSON.stringify(products))
            return products
        } catch (e: any){
            if(e.response.status === 400){
                throw new Error("Product not found")
            }
            throw new Error(`unexpected error: ${e}`)
        } finally{
            await client.quit()
        }
    }
    async getProductById(productId: string): Promise<Product> {
        const client = createClient()
        await client.connect()
        const productFromCache = await client.get(productId)
        if(productFromCache){
            await client.quit()
            return JSON.parse(productFromCache) as Product
        }
        try{
            const responseGetProduct = await axios.get(`http://challenge-api.luizalabs.com/api/product/${productId}/`)
            const outputGetProduct = responseGetProduct.data
            const product = Product.restore(outputGetProduct.price, outputGetProduct.image, outputGetProduct.brand, outputGetProduct.id, outputGetProduct.title)
            await client.set(product.id, JSON.stringify(product))
            return product
        } catch(e: any){
            throw new Error("Product not found")
        } finally{
            await client.quit()
        }
    }

}