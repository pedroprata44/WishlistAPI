import axios from "axios";
import Product from "../domain/Product";

export default class GetProduct{
    async execute(productsIds: any[]): Promise<Product[]>{
        try{
            const products: Product[] = []
            for(const productId of productsIds){
                const responseGetProduct = await axios.get(`http://challenge-api.luizalabs.com/api/product/${productId}/`)
                const outputGetProduct = responseGetProduct.data
                const product = new Product(outputGetProduct.price, outputGetProduct.image, outputGetProduct.brand, outputGetProduct.id, outputGetProduct.title)
                products.push(product)
            }
            return products
        } catch(e: any){
            throw new Error("Product id not found")
        }
    }
}