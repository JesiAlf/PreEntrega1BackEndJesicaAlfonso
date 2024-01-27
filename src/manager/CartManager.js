import fs from "fs";
import {productManager}  from "../services/app.js";
//import fs from "fs"

export class CartManager{
  constructor(){
    this.path="../data/carts.json";
    this.carts=[];
  };

  getCart(){
    try {
      const data=fs.readFileSync(this.path, "utf8");
      this.carts=JSON.parse(data);
      console.log("Las carts se cargaron exitosamente:", this.carts)
    } catch (error) {
      console.error("error de carts:", error);
      return[];
      }
};

  addCart(){
    // this.getCart()
    const newCart={
      id: this.carts.length +1,
      products:[],
    };
    this.carts.push(newCart);

    try {
      fs.writeFileSync(this.path, JSON.stringify(this.carts,null,2));
      console.log("cart save succefull!");
      return newCart;
    } catch (error) {
      console.error("the carts couldnt save succefull", error);
      return null;
    
  }
};

  getCartById(cid) {
    this.getCart();

    const cart = this.carts.find((cart) => cart.id === cid);
    if (cart === undefined) {
      console.log(`the product with the ID ${cid} not exist`);
      return null;
    } else {
      console.log("cart not find");
      return cart;
    }
  };

  addProduct(cid,pid) {
    this.getCart();
    const cart = this.carts.find((cart) => cart.id === cid);
    if (!cart) {
      console.log(`the cart with the ID ${cid} not find`);
      return;
    }

    const productValid= this.products.find((p)=>p.id===pid);
    if (!productValid) {
      console.log("the code already exists");
      return;
    }

    cart.products.push({ pid });

    try {
      fs.writeFileSync(this.path, JSON.stringify(this.carts,null,2));
      console.log("saved data successfully");
    } catch (error) {
      console.error("An error occurred while reading the files", error);
    }
  }

  deleteProduct(id) {
    this.getCart();
    if (this.carts.find((cart) => cart.id === id) === undefined) {
      console.error(`the ID ${id} noy exist`);
      return;
    }

    const indice = this.carts.findIndex((cart) => cart.id === id);
    this.carts.splice(indice, 1);
    try {
      fs.writeFileSync(this.path, JSON.stringify(this.carts,null,2));
      console.log("delete cart");
    } catch (error) {
      console.log("mistake to delete", error);
    }
  };

}
