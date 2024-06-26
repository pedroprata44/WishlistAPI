import Signup from "../src/Signup"

let signup: Signup

beforeEach(() => {
    signup = new Signup()
})

test("Should return a email already exists when do signup", function(){
    const inputClient = {
        name: "client client",
        email: "client@client"
    }
    const outputSignup = signup.execute(inputClient).accountEmail
    expect(outputSignup).toBe(inputClient.email)
})

test.each([undefined, null, "", "client"])("Should not do signup with a invalid name", function(name: any){
    const inputClient = {
        name: name,
        email: "client@client"
    }
    expect(() => signup.execute(inputClient)).toThrow("Invalid name")
})

test.each([undefined, null, "", "@", "client.client"])("Should not do signup with a invalid email", function(email: any){
    const inputClient = {
        name: "client client",
        email: email
    }
    expect(() => signup.execute(inputClient)).toThrow("Invalid email")
})