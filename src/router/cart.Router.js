import express from "express";
import cartManager  from "../manager/CartManager.js";

const router = express.Router();

router.use(express.json());
//const cartsRouter=[];
router.use(express.urlencoded({ extended: true }));

router.post("/", async (req, res) => {
  try {
    const productId = parseInt(req.params.productId);

    const CartId = parseInt(req.params.CartId);
    const cart = await cartManager.addProduct(cart); //users.push(newid);

    res.json({ status: "success", payload: CartId, productId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/api/cart", async (req, res) => {
  try {
    const id = parseInt(req.params.cid); //req.body;
    const cart = await cartManager.getCrtByd(id); //users.push(newid);
    res.json({ status: "Cart creado", payload: cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/api/:pid", async (req, res) => {
  try {
    const cartId = parseInt(req.params.cid);
    const productId = parseInt(req.params.pid);

    const cart = await cartManager.addProduct(cartId, productId);
    res.json({ status: "sucess", payload: cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:cid", async (req, res) => {
  try {
    const cartid = parseInt(req.params.cid);
    const productId = parseInt(req.params.pid);

    const cart = await cartManager.remove(cartid, productId); //users.push(newid);
    res.json({ status: "Cart borrado", payload: cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
