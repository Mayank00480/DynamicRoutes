const fs = require('fs');
const path = require('path');
const database = require('../util/database')
const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    return database.execute('INSERT INTO products(title , description , price , imageUrl) values(? , ? , ? , ?)',[this.title , this.description , this.price , this.imageUrl]);
  }

  static fetchAll() {
     return database.execute('SELECT * FROM products');    
  }
  static getProductById(id){
   return database.execute('SELECT * FROM products where products.id = ?' ,[id]);
  }
  static deleteProduct(id){
    return database.execute('DELETE FROM products WHERE id = ? ',[id]);
  }
};
