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
        const products_ids: any[] = await this.dbConnection.query("select product_id from data.wishlist where client_email = $1", [clientEmail])
        if(!products_ids) throw new Error("Empty wishlist")
        const products = await this.getProduct.execute(products_ids)
        if(!products) throw new Error("Product id not found")
        const output = Wishlist.restore(clientEmail, products)
        return output
    }
}