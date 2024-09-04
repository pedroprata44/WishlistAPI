import axios from "axios"
import dotenv from 'dotenv'

dotenv.config()

test("Should create a client and resolves a token by api", async function (){
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
    await axios.post(`http://localhost:${process.env.WISHLIST_PORT}/createclient`, inputClient)
    const responseGet = await axios.get(`http://localhost:${process.env.WISHLIST_PORT}/getclient/${inputClient.email}`)
    const outputGet = responseGet.data

    expect(outputGet.accountEmail).toBe(inputClient.email)
    expect(outputGet.accountName).toBe(inputClient.name)
})