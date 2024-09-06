import axios from "axios"
import dotenv from 'dotenv'

axios.defaults.validateStatus = function (){
    return true
}

beforeAll(() => {
    dotenv.config()
})

test("Should create a client by api", async function (){
    const inputClient = {
        name: "client client",
        email: `client${Math.random()}@client`
    }
    const responseCreate = await axios.post(`http://localhost:${process.env.WISHLIST_PORT}/createclient`, inputClient)
    const outputCreate = responseCreate.data

    expect(outputCreate).toBeDefined()
})

test("Should get a client by api", async function (){
    const inputClient = {
        name: "client client",
        email: `client${Math.random()}@client`
    }
    const responseCreateClient = await axios.post(`http://localhost:${process.env.WISHLIST_PORT}/createclient`, inputClient)
    const token = responseCreateClient.data

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const responseGet = await axios.get(`http://localhost:${process.env.WISHLIST_PORT}/getclient/${inputClient.email}`, config)
    const outputGet = responseGet.data
    expect(outputGet.accountEmail).toBe(inputClient.email)
    expect(outputGet.accountName).toBe(inputClient.name)
})

test("Should update a client by api", async function (){
    const inputClient = {
        name: "client client",
        email: `client${Math.random()}@client`
    }
    const responseCreateClient = await axios.post(`http://localhost:${process.env.WISHLIST_PORT}/createclient`, inputClient)
    const token = responseCreateClient.data
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const updateClient = {
        name: "client client",
        email: `client${Math.random()}@client`
    }
    const responseUpdateClient = await axios.post(`http://localhost:${process.env.WISHLIST_PORT}/updateclient/${inputClient.email}`, updateClient, config)
    const outputGet = responseUpdateClient.data

    expect(outputGet.nameUpdated).toBe(updateClient.name)
    expect(outputGet.emailUpdated).toBe(updateClient.email)
})

test("Should remove a client by api", async function(){
    const inputClient = {
        name: "client client",
        email: `client${Math.random()}@client`
    }
    const responseCreateClient = await axios.post(`http://localhost:${process.env.WISHLIST_PORT}/createclient`, inputClient)
    const token = responseCreateClient.data
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    await axios.post(`http://localhost:${process.env.WISHLIST_PORT}/removeclient/${inputClient.email}`, "", config)

    const responseGetClient = await axios.get(`http://localhost:${process.env.WISHLIST_PORT}/getclient/${inputClient.email}`, config)
    expect(responseGetClient.data.message).toBe("Client not found")
})

test("Should add a product to wishlist by api", async function (){
    const inputClient = {
        name: "client client",
        email: `client${Math.random()}@client`
    }
    const responseCreateClient = await axios.post(`http://localhost:${process.env.WISHLIST_PORT}/createclient`, inputClient)
    const token = responseCreateClient.data
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const productId = "1"

    await axios.post(`http://localhost:3000/addproduct/${inputClient.email}`, {productId: productId}, config)
    const responseGetWishlist = await axios.get(`http://localhost:${process.env.WISHLIST_PORT}/getwishlist/${inputClient.email}`, config)
    const outputGetWilist = responseGetWishlist.data

    expect(outputGetWilist.products[0].id).toBe(productId)
})

test("Should get a product by api", async function(){
    const inputClient = {
        name: "client client",
        email: `client${Math.random()}@client`
    }
    const responseCreateClient = await axios.post(`http://localhost:${process.env.WISHLIST_PORT}/createclient`, inputClient)
    const token = responseCreateClient.data
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const responseGetProduct = await axios.get(`http://localhost:${process.env.WISHLIST_PORT}/getproduct/1`, config)
    const product = responseGetProduct.data

    console.log(product);
    expect(product.id).toBeDefined()
})