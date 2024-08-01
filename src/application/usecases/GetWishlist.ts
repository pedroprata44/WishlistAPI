import ClientRepository from "../../repository/ClientRepository"
import WishlistRepository from "../../repository/WishlistRepository"

export default class GetWishlist{
    constructor(private clientRepository: ClientRepository, private wishlisRepository: WishlistRepository){

    }
    async execute(clientEmail: string): Promise<Output>{
        const clientExisting = await this.clientRepository.getByEmail(clientEmail)
        if(!clientExisting) throw new Error("Client not found")
        const wishlist = await this.wishlisRepository.getByEmail(clientEmail)
        return {
            clientEmail: wishlist.clientEmail,
            productsId: wishlist.productsIds
        }
    }
}
type Output = {
    clientEmail: string,
    productsId: any[]
}