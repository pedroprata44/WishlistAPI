import ProductRepository from "../../repository/ProductRepository";

export default class GetProduct{
    constructor(private productRepository: ProductRepository){
    }

    async execute(productId: string){
        const productFromRepository = await this.productRepository.getById(productId)
        return productFromRepository
    }
}