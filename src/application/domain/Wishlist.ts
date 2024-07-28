import Product from "./Product";

export default class Wishlist{
    constructor(readonly clientEmail: string, readonly products: Product[]){
        
    }

    static restore(clientEmail: string, products: Product[]){
        return new Wishlist(clientEmail, products)
    }
}