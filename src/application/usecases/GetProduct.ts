import ProductRepository from "../../repository/ProductRepository";

export default class GetProduct{
    constructor(private productRepository: ProductRepository){
    }

    async execute(productId: string){
        const product = await this.productRepository.getProductById(productId)
        return product
    }
}