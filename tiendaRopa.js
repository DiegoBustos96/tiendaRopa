class ProductManager {
  constructor() {
    this.productos = [];
    this.nextId = 1;
  }

  agregarProducto(
    nombreProducto,
    descripcion,
    precio,
    thumbnail,
    codigo,
    stock
  ) {
    if (
      !nombreProducto ||
      !descripcion ||
      !precio ||
      !thumbnail ||
      !codigo ||
      !stock
    ) {
      return "Todos los campos son obligatorios";
    }

    if (this.productos.some((producto) => producto.codigo === codigo)) {
      return "El producto ya existe";
    }

    precio = parseFloat(precio);

    const producto = {
      id: this.nextId,
      nombreProducto,
      descripcion,
      precio,
      thumbnail,
      codigo,
      stock,
    };
    this.productos.push(producto);
    this.nextId++;
  }

  getProductos() {
    return this.productos;
  }

  getProductosById(id) {
    const producto = this.productos.find((producto) => producto.id === id);
    if (producto) {
      return producto;
    } else {
      console.error("Producto no encontrado.");
      // return "Producto no encontrado";
    }
  }
}

const productManager = new ProductManager();

productManager.agregarProducto(
  "Camisa",
  "Camisa de algodón",
  25000,
  "camisa.jpg",
  "001",
  30
);

productManager.agregarProducto(
  "Pantalón",
  "Pantalon de mezclilla",
  30000,
  "pantalon.jpg",
  "002",
  30
);

console.log(productManager.getProductos());

const productById = productManager.getProductosById(1);
console.log(productById);

const productoNoEncontrado = productManager.getProductosById(3);
