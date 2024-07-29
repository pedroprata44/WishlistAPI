import axios from "axios";
import ClientRepository from "../../repository/ClientRepository";
import GetClient from "./GetClient";
import WishlistRepository from "../../repository/WishlistRepository";

export default class AddProduct{
    constructor(readonly clientRepository: ClientRepository, readonly wishlistRepository: WishlistRepository){
        
    }
    async execute(clientEmail: string, productId: string){
        const clientExisting = await this.clientRepository.getByEmail(clientEmail)
        if(!clientExisting) throw new Error("Client not found")
        try{
            const productExisting = (await axios.get(`http://challenge-api.luizalabs.com/api/product/${productId}/`)).data
            await this.wishlistRepository.save(clientEmail, productExisting.id)
        } catch(e){
            if(axios.isAxiosError(e)){
                if(e.response?.status === 404){
                    throw new Error("Product not found")
                }
            }
        }
    }
}