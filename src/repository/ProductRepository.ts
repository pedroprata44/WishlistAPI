import Product from "../application/domain/Product";

export default interface ProductRepository{
    getProductsByPageNumber(pageNumber: string): Promise<Product[]>
    getProductById(productId: string): Promise<Product>
}