import{ProductManager}from"./manager/productManager.js";
import express from"express";
import cartsRouter from"./router/cart.Router.js";
import productsRouter from"./router/product.router.js";
import{CartManager}from"./manager/CartManager.js";
import{fileURLToPath}from"url";
import{dirname,join}from'path';

//const PATH_PRODUCTS="../data/services/products.json";
//const PATH_CARTS="../data/services/carts.json";

const __filename=fileURLToPath(import.meta.url)
const __dirname=dirname(__filename)

//inicializar la app con express_

const app=express();
const PORT=8080;

export const productManager= new ProductManager();
export const cartManager=new CartManager();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
//app.use(express.static(path.join(__dirname,"/views")))

app.use("/api/carts",cartsRouter);
app.use("/api/products",productsRouter);

const server= app.listen(8080,()=>{
console.log("server runing o post 8080");
})
