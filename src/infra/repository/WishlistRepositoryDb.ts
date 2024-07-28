import Product from "../../application/domain/Product";
import WishlistRepository from "../../repository/WishlistRepository";
import DatabaseConnection from "../database/DatabaseConnection";

export default class WishlistRepositoryDb implements WishlistRepository{
    constructor(readonly dbConnection: DatabaseConnection){

    }
    async getByEmail(clientEmail: string): Promise<Product[]| undefined> {
        const wishlistExisting =  await this.dbConnection.query("select product_id from data.wishlist where client_email = $1",[clientEmail])
        if(!wishlistExisting) throw new Error("Client not found")
        const output: Product[] = []
        for(const productId in wishlistExisting.product_id){
            let product = await this.dbConnection.query("select * from data.product where id = $1",[productId])
            if(!product) throw new Error("Product not found")
            output.push(product)
        }
        return output
    }
}