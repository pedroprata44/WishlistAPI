import Client from "../src/application/domain/Client"

test.each([undefined, null, "", "client"])("Should not do signup with a invalid name", function(name: any){
    expect(() => new Client(name, "")).toThrow("Invalid name")
})

test.each([undefined, null, "", "@", "client.client"])("Should not do signup with a invalid email", function(email: any){
    expect(() => new Client("client client", email)).toThrow("Invalid email")
})