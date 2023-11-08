const fs = require("fs"); 

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
  }

 
  getProducts() {
    try {
      const data = fs.readFileSync(this.path, "utf8");
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }


  addProduct(product) {
    const products = this.getProducts();

    
    const lastProduct = products[products.length - 1];
    product.id = lastProduct ? lastProduct.id + 1 : 1;

    products.push(product);

    
    fs.writeFileSync(this.path, JSON.stringify(products, null, 2));

    return product;
  }

  
  getProductById(id) {
    const products = this.getProducts();
    return products.find((product) => product.id === id);
  }

  
  updateProduct(id, updatedProduct) {
    const products = this.getProducts();
    const index = products.findIndex((product) => product.id === id);

    if (index !== -1) {
      
      updatedProduct.id = id;
      products[index] = updatedProduct;
      fs.writeFileSync(this.path, JSON.stringify(products, null, 2));
      return updatedProduct;
    } else {
      return null; 
    }
  }

  
  deleteProduct(id) {
    const products = this.getProducts();
    const updatedProducts = products.filter((product) => product.id !== id);
    fs.writeFileSync(this.path, JSON.stringify(updatedProducts, null, 2));
  }
}

module.exports = ProductManager;


const productManager = new ProductManager("products.json");


productManager.addProduct({
  title: "Camiseta",
  description: "Camiseta de algodón",
  price: 19.99,
  thumbnail: "camiseta.jpg",
  code: "CAM001",
  stock: 100,
});


const allProducts = productManager.getProducts();
console.log(allProducts);


const product = productManager.getProductById(1);
console.log(product);


productManager.updateProduct(1, {
  title: "Nueva Camiseta",
  description: "Camiseta de algodón mejorada",
  price: 24.99,
  thumbnail: "nueva_camiseta.jpg",
  code: "CAM002",
  stock: 150,
});


productManager.deleteProduct(1);
