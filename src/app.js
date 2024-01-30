import { ProductManager } from "./manager/productManager.js";
//import CartManager  from "./manager/cartManager.js";
import express from "express";
import cartsRouter from "./router/cart.Router.js";
import productsRouter from "./router/product.router.js";
import {Server} from "socket.io";
import __dirname from "./views/utils.js";
import handlebars from "express-handlebars";
import viewsRouter from "./router/views.router.js";



const PATH_PRODUCTS = "../data/services/products.json";
const PATH_CARTS = "../data/services/carts.json";
const PORT = 8080;
//const productManager = new ProductManager("./src/data/products.json");

//inicializar la app con express
const app = express();
export const productManager = new ProductManager();
export const cartManager = new CartManager();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/views")))


app.use("/api/carts", cartsRouter);
app.use("/api/products", productsRouter);


import{fileURLToPatch}from "url";
import { dirname,join } from "path";
import { CartManager } from "./manager/cartManager.js";

const __filename= fileURLToPatch (import.meta.url)
//const __dirname= dirname (__filename)

//estructura codigo handlebans
app.engine("handlebars", handlebars.engine());
//tenemos que setear, debemos decir q nuestro views engines y la extencion de los archivo estan en handlebars.
app.set("view  engine","handlebars");
//luego decirles donde estan esos archivos
app.set("views",__dirname+ " /views");

const httpServer= app.listen(PORT, () => console.log(`server runing o post ${PORT}`));

//conexiion con socket.io
const socketServer= new Server(httpServer)
app.use("/", viewsRouter);
