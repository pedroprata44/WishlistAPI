import Product from "./Product";

export default class Wishlist{
    constructor(private clientEmail: string, private products: Product[]){
        
    }
}