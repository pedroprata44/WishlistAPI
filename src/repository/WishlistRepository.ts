import Product from "../application/domain/Product";

export default interface WishlistRepository{
    getByEmail(clientEmail: string): Promise<Product[] | undefined>
}