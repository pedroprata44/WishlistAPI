import ClientRepository from "../../repository/ClientRepository"
import WishlistRepository from "../../repository/WishlistRepository"

export default class GetWishlist{
    constructor(private clientRepository: ClientRepository, private wishlisRepository: WishlistRepository){

    }
    async execute(clientEmail: string){
        const clientExisting = await this.clientRepository.getByEmail(clientEmail)
        if(!clientExisting) throw new Error("Client not found")
        return await this.wishlisRepository.getByEmail(clientEmail)
    }
}