export default class Wishlist{
    constructor(readonly clientEmail: string, readonly products: Object[]){
        
    }

    static restore(clientEmail: string, products: Object[]){
        return new Wishlist(clientEmail, products)
    }
}