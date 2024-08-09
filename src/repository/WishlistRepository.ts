import Wishlist from "../application/domain/Wishlist";

export default interface WishlistRepository{
    save(clientEmail: string, productId: string): Promise<void>
    getByEmail(clientEmail: string): Promise<Wishlist>
    getProductInWishlist(clientEmail:string, productId: string): Promise<any[]>
}