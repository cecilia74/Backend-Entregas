import express  from "express";
import ProductManager from "../logic/ProductManager";

export const testPlantillaProducts = express.Router();

testPlantillaProducts.get("/",(req,res)=> {
    return res.status(200).render("realtimeproducts",{});
})