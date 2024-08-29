import Product from "../application/domain/Product";

export default interface ProductRepository{
    getProductById(productId: string): Promise<Product>
    getById(productId: string): Promise<Product>
}