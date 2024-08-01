export default class Wishlist{
    constructor(readonly clientEmail: string, readonly productsIds: any[]){
    }

    static restore(clientEmail: string, productsIds: any[]){
        return new Wishlist(clientEmail, productsIds)
    }
}