import Wishlist from "../../application/domain/Wishlist";
import GetProduct from "../../application/usecases/GetProduct";
import WishlistRepository from "../../repository/WishlistRepository";
import DatabaseConnection from "../database/DatabaseConnection";

export default class WishlistRepositoryDb implements WishlistRepository{
    constructor(private dbConnection: DatabaseConnection, private getProduct: GetProduct){
    }
    async save(clientEmail: string, productId: string){
        await this.dbConnection.query("insert into data.wishlist (client_email, product_id) values ($1, $2)", [clientEmail, productId])
    }
    async getByEmail(clientEmail: string): Promise<Wishlist>{  
        const productsIds = await this.dbConnection.query("select product_id from data.wishlist where client_email = $1", [clientEmail])
        if(!productsIds) throw new Error("Empty wishlist")
        const products = await this.getProduct.execute(productsIds)
        const output = Wishlist.restore(clientEmail, products)
        return output
    }
}