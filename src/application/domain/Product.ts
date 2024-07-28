export default class Product{
    constructor(readonly id: string, readonly price: string, readonly image: string, readonly brand: string, readonly title: string){
    }
    static restore(id: string, price: string, image: string, brand: string, title: string){
        return new Product(id, price, image, brand, title)
    }
}