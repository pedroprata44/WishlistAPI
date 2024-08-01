import axios from "axios"

test("Should create a client by api", async function (){
    const inputClient = {
        name: "client client",
        email: `client${Math.random()}@client`
    }
    const responseCreate = await axios.post("http://localhost:3000/createclient", inputClient)
    const outputCreate = responseCreate.data

    expect(outputCreate.accountEmail).toBe(inputClient.email)
})

test("Should get a client by api", async function (){
    const inputClient = {
        name: "client client",
        email: `client${Math.random()}@client`
    }
    await axios.post("http://localhost:3000/createclient", inputClient)
    const responseGet = await axios.get(`http://localhost:3000/getclient/${inputClient.email}`)
    const outputGet = responseGet.data

    expect(outputGet.accountEmail).toBe(inputClient.email)
    expect(outputGet.accountName).toBe(inputClient.name)
})