import express from "express";
import {ProductManager} from "../manager/productManager.js"

const router = express.Router();


router.get("/", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit);
    const productManager=new ProductManager("./products.json")
    const products = await productManager.getProduct();
    if (!isNaN(limit) && limit > 0) {
      let showProducts = products.slice(0, limit);
        res.json(showProducts);
    } else {
      res.json(products);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
   
router.get("/:pid", async (req, res) => {
  try {
    const id=parseInt(req.params.pid);
    const productManager=new ProductManager("./products.json")
    const products = await productManager.getProductById (id);
    res.json({ status: "success", payload: products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const product = req.body;
    const productManager = new ProductManager("./products.json");
    const newProduct = await productManager.addProduct(product);

    res.json({ status: "sucess", payload: newProduct });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:pid", async(req, res)=>{
  try{
    const id=parseInt(req.params.pid);
    const product=req.body;
    const productManager = new ProductManager("./products.json");
    const updateProduct= await productManager.updateProduct(id, product);
    res.json({status: "success", payload: updateProduct});
  }catch(error){
    res.status(500).json({error:error.message});
  }
});

router.delete("/:pid", async (req, res) => {
  try {
    const id= parseInt (req.params.pid);
    const productManager = new ProductManager("./products.json");
    const deleteProduct = await productManager.deleteProduct(id);
    res.json({ status: "sucess", payload: deleteProduct });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


export default router;
