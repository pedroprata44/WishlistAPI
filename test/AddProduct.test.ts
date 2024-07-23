test("Should add a product to list", async function (){
    const outputAddProduct = await addProduct.execute(1, 1)
    const outputGetProduct = await getProduct.execute(outputAddProduct.productId)
    expect(outputGetProduct.productId).toBe(outputAddProduct.productId)
})