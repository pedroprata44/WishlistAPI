export default class Product{
    price: number
    image: string
    brand: string
    id: string
    title: string
    constructor(price: number, image: string, brand: string, id: string, title: string){
        this.price = price
        this.image = image
        this.brand = brand
        this.id = id
        this.title = title
    }
    static restore(price: number, image: string, brand: string, id: string, title: string){
        return new Product(price, image, brand, id, title)   
    }
}