import WishlistRepository from "../../repository/WishlistRepository";
import Wishlist from "../domain/Wishlist";

export default class GetWishList{
    constructor(readonly wishlistRepository: WishlistRepository){
        
    }
    async execute(clientEmail: string): Promise<Wishlist | undefined>{
        const wishlistExisting = await this.wishlistRepository.getByEmail(clientEmail)
        if(!wishlistExisting) throw new Error("Client wishlist not found")
        return wishlistExisting
    }
}