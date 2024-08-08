import ProductRepository from "../../repository/ProductRepository";

export default class ListProducts{
    constructor(private productRepository: ProductRepository){
    }
    async execute(pageNumber: string){
        return await this.productRepository.getProductsByPageNumber(pageNumber)
    }
}