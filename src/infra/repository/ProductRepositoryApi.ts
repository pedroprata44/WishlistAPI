import axios, { AxiosError } from "axios";
import Product from "../../application/domain/Product";
import ProductRepository from "../../repository/ProductRepository";

export default class ProductRepositoryApi implements ProductRepository{
    async getProductsByPageNumber(pageNumber: string): Promise<Product[]> {
        try{
            const responseGetPage= await axios.get(`http://challenge-api.luizalabs.com/api/product/?page=${pageNumber}`)
            const outputGetPage = responseGetPage.data
            const products = outputGetPage.products
            return products
        } catch (e: any){
            if(e.response.status === 400){
                throw new Error("Product not found")
            }
            throw new Error(`unexpected error: ${e}`)
        }
    }
    async getProductById(productId: string): Promise<Product> {
        try{
            const responseGetProduct = await axios.get(`http://challenge-api.luizalabs.com/api/product/${productId}/`)
            const outputGetProduct = responseGetProduct.data
            const product = Product.restore(outputGetProduct.price, outputGetProduct.image, outputGetProduct.brand, outputGetProduct.id, outputGetProduct.title)
            return product
        } catch(e: any){
            throw new Error(e)
        }
    }

}