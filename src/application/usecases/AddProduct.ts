import axios from "axios";
import ClientRepository from "../../repository/ClientRepository";
import WishlistRepository from "../../repository/WishlistRepository";

export default class AddProduct{
    constructor(private clientRepository: ClientRepository, private wishlistRepository: WishlistRepository){
    }
    async execute(clientEmail: string, productId: string){
        const clientExisting = await this.clientRepository.getByEmail(clientEmail)
        if(!clientExisting) throw new Error("Client not found")
        try{
            await axios.get(`http://challenge-api.luizalabs.com/api/product/${productId}/`)
        } catch(e: any){
            throw new Error("Product not found")
        }
        const isProductInWishlist = await this.wishlistRepository.getProductInWishlist(clientEmail, productId)
        if(isProductInWishlist.length != 0) throw new Error("This product already includes in wishlist")
        await this.wishlistRepository.save(clientEmail, productId)
    }
}