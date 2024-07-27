import Wishlist from "../application/domain/Wishlist";

export default interface WishlistRepository{
    getByEmail(clientEmail: string): Promise<Wishlist | undefined>
}