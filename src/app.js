import{ProductManager}from"./manager/productManager.js";
import express from"express";
import cartsRouter from"./router/cart.Router.js";
import productsRouter from"./router/product.router.js";
import{Server}from"socket.io";
import handlebars from"express-handlebars";
import viewsRouter from"./router/views.router.js";
import path from'path'
import{CartManager}from"./manager/CartManager.js";
import{dirname,join}from'path';

const PATH_PRODUCTS="../data/services/products.json";
const PATH_CARTS="../data/services/carts.json";

const PORT=8080;
const __filename=fileURLToPath(import.meta.url)
const __dirname=dirname(__filename)

//inicializar la app con express_

const app=express();

export const productManager= new ProductManager();
export const cartManager=new CartManager();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"/views")))

app.use("/",cartsRouter);
app.use("/",productsRouter);

import{fileURLToPath}from"url";

//estructura codigo handlebans_

app.engine("handlebars",handlebars.engine());

//tenemos que setear, debemos decir q nuestro views engines y la extencion de los archivo estan en handlebars._

app.set("view  engine","handlebars");

//luego decirles donde estan esos archivos_

app.set("views",__dirname+" /views");

const httpServer=app.listen(PORT,()=>console.log(`server runing o post ${PORT}`));

//conexiion con socket.io_

const socketServer=new Server(httpServer)

app.use("/",viewsRouter);