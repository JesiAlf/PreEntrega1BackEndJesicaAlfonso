import express from "express";
import {ProductManager} from "../manager/productManager.js"
//import { productManager } from "../manager/productManager.js";



const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/", async (req, res) => {
  try {
    const limit = parseInt(req.params.pid);
    //const p=new ProductManager("./products.json")
    const products = await ProductManager.getProduct();
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
    //const p=new ProductManager("./products.json")
    const products = await ProductManager.getProductById (id);
    res.json({ status: "success", payload: products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const product = req.body;
    const newProduct = await ProductManager.addProduct(product);
    res.json({ status: "sucess", payload: newProduct });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:pid", async(req, res)=>{
  try{
    const id=parseInt(req.params.pid);
    const product=req.body;
    const updateProduct= await ProductManager.updateProduct(id, product);
    res.json({status: "success", payload: updateProduct});
  }catch(error){
    res.status(500).json({error:error.message});
  }
});

router.delete("/:pid", async (req, res) => {
  try {
    const id= parseInt (req.params.pid);
    const deleteProduct = await ProductManager.deleteProduct(id);
    res.json({ status: "sucess", payload: deleteProduct });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


export default router;
