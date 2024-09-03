import Product from "../application/domain/Product";

export default interface ProductRepository{
    getById(productId: string): Promise<Product>
}