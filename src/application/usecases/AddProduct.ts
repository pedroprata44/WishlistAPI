import ClientRepository from "../../repository/ClientRepository";
import WishlistRepository from "../../repository/WishlistRepository";
import ProductRepository from "../../repository/ProductRepository";

export default class AddProduct{
    constructor(private clientRepository: ClientRepository, private wishlistRepository: WishlistRepository, private productRepository: ProductRepository){
    }
    async execute(clientEmail: string, productId: string){
        const clientExisting = await this.clientRepository.getByEmail(clientEmail)
        if(!clientExisting) throw new Error("Client not found")
        await this.productRepository.getProductById(productId)
        const isProductInWishlist = await this.wishlistRepository.getProductInWishlist(clientEmail, productId)
        if(isProductInWishlist.length != 0) throw new Error("This product already includes in wishlist")
        await this.wishlistRepository.save(clientEmail, productId)
    }
}