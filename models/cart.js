const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
  );

module.exports = class Cart{
    static addProduct(id , prodPrice){
      fs.readFile(p , (err , fileContent) => {
        let cart = {products : [] ,totalPrice : 0};
        if(!err){
            cart = JSON.parse(fileContent);
        }
        const existingProduct = cart.products.find(item => item.id === id);
        const existingProductIndex = cart.products.findIndex(item => item.id === id);
        let updatedProduct;
        if(existingProduct){
            updatedProduct = {...existingProduct};
            updatedProduct.qty = updatedProduct.qty + 1;
            cart.products[existingProductIndex] = updatedProduct;
        }
        else{
            updatedProduct = {id : id , qty : 1}
            cart.products = [...cart.products , updatedProduct];
        }
       cart.totalPrice = cart.totalPrice + +prodPrice;
       fs.writeFile(p ,JSON.stringify(cart) , err => {
        console.log(err);
       })
      })
    }
}