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