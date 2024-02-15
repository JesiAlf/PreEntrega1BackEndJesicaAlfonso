import express from "express";
import { CartManager } from "../manager/CartManager.js";

const router = express.Router();

const cartManager= new CartManager();

//Para crear un carrito
router.post("", async (req, res) => {
  //const cuerpo= req.body;
  //console.log("-router.post- cuerpo", cuerpo)
  res.send("dd");
  try { 
    const {productId, CartId} = req.body;

    const cart = await cartManager.addProduct(CartId,productId ); //users.push(newid);

    res.json({ status: "success", payload: cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Ruta para listar los productos segn id del carrito
router.get("/api/:cid", async (req, res) => {
  res.send("ok obtencion de products");
  try {
    const cartId = parseInt(req.params.cid); //req.body;
    const cart = await cartManager.getCrtByd(cartId); 
    res.json({ status: "Cart obtenido", payload: cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
//Agrega una lista de productos a la lista de carritos
router.post("/api/:cid/products/:pid", async (req, res) => {
  try {
    const cartId = parseInt(req.params.cid);
    const productId = parseInt(req.params.pid);

    const cart = await cartManager.addProduct(cartId, productId);
    res.json({ status: "sucess", payload: cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/api/:cid/products/:pid", async (req, res) => {
  try {
    const cartId = parseInt(req.params.cid);
    const productId = parseInt(req.params.pid);

    const cart = await cartManager.deleteProduct (cartId, productId); //users.push(newid);
    res.json({ status: "Cart borrado", payload: cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
