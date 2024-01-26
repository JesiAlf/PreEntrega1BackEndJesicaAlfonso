import { ProductManager } from "../manager/productManager.js";
import { CartManager } from "../manager/cartManager.js";
import express from "express";
import cartsRouter from "../router/cart.Router.js";
import productsRouter from "../router/product.router.js";

const PATH_PRODUCTS = "../data/services/products.json";
const PATH_CARTS = "../data/services/carts.json";
const PORT = 8080;
//const productManager = new ProductManager("./src/data/products.json");

//inicializar la app con express
const app = express();
export const productManager = new ProductManager(PATH_PRODUCTS);
export const cartManager = new CartManager(PATH_CARTS);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/carts", cartsRouter);
app.use("/api/products", productsRouter);

/*app.get("/products", (req, res) => {
  //probar leer el archivo
  try {
    let products = productManager.getProduct();
    console.log("los productos son:", products);

    //let products= await fs.promises.readFile("./products.json","utf-8")
    //let parsedProducts = JSON.parse(products);
    const limit = parseInt(req.query.limit);

    //en caso que el limite del req.query no sea un numero, se devuelve el JSON del producto completo
    if (!isNaN(limit) && limit > 0) {
      let limitProducts = products.slice(0, limit);
      if (limitProducts) {
        res.json(limitProducts);
      }
    } else {
      res.json(products);
    }
  } catch (error) {
    res.send("error al obtener los productos");
  }
});*/

//obtener los productos segun su id desde prductManager

/*app.get("/products/:id", (req, res) => {
  try {
    /*let products = await fs.promises.readFile("./products.json", "utf-8");
    let parsedProducts = JSON.parse(products);*/
/*const id = parseInt(req.params.id);
    let product = productManager.getProductById(id); //parsedProducts.find((u) => u.id === id);
    if (!product) {
      return res.send("error: the product to this id dont exist");
    } else {
      return res.send(product);
    }
  } catch (error) {
    return res.send(error);
  }
});*/

app.listen(PORT, () => console.log(`server runing o post ${PORT}`));
