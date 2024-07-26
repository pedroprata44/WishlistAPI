import axios from "axios";

export default class ListProducts{
    async execute(pageNumber: number){
        const responseListProducts = await axios.get(`http://challenge-api.luizalabs.com/api/product/?page=${pageNumber}`)
        const outputListProducts = responseListProducts.data
        const products = outputListProducts.products
        return products
    }
}