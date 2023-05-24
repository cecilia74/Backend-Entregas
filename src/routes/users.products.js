
import express from 'express';
import ProductManager from '../logic/ProductManager.js';

export const productsRouter = express.Router();

const newProductManager = new ProductManager('../data/Products.json');


productsRouter.get("/", async (req, res) => {

    try {
        const { limit } = req.query;
        const products = await newProductManager.getProducts();
        if (limit) {
            const limitprod = products.slice(0, parseInt(limit))
            res.status(200).send({
                status: "SUCCESS",
                msg: "Found requested products",
                data: limitprod,
            });

        } else {
            res.status(200).send({
                status: "SUCCESS",
                msg: "Found all products",
                data: products,
            });
        }
    }
    catch (err) {
        res.status(500).send({
            status: "ERROR",
            msg: err.message,
            data: {},
        })
    }

})


productsRouter.get("/:pid", async (req, res) => {

    try {
        let idid = req.params.pid;
        let idEncontrado = await newProductManager.getProductById(idid);
        if (idEncontrado) {
            res.status(200).send({
                status: "SUCCESS",
                msg: "Product found.",
                data: idEncontrado,
            });
        }
        else {
            res.status(400).json({
                status: "ERROR",
                msg: "Product doesn't exist",
                data: {},
            })
        }

    } catch (err) {
        res.status(500).send({
            status: "ERROR",
            msg: err.message,
            data: {},
        })
    }
});

productsRouter.post("/", (req, res) => {
    try {

        const prodtitle = req.body.title;
        const proddes = req.body.description;
        const prodprice = req.body.price;
        const prodthum = req.body.thumbnail;
        const prodcode = req.body.code;
        const prods = req.body.stock;
        const newprod = newProductManager.addProduct(prodtitle,proddes,prodprice,prodthum,prodcode,prods);
        console.log(newprod);
        if (newprod) {

            res.status(200).send({
                status: "SUCCESS",
                msg: "Product added.",
                data: newprod,
            });
        } else {
            res.status(400).json({
                status: "ERROR",
                msg: "Product not added",
                data: {},
            })
        }
    } catch (err) {
        res.status(500).send({
            status: "ERROR",
            msg: err.message,
            data: {},
        })
    }
});


 productsRouter.put("/:pid", (req, res) => {
    try {
        const di = req.params.pid;
        const newtitle = req.body.title;
        const newdes = req.body.description;
        const newprice = req.body.price;
        const prodthum = req.body.thumbnail;
        const newcode = req.body.code;
        const news = req.body.stock;
        let putid = newProductManager.updateProduct(di, newtitle,newdes,newprice,prodthum,newcode,news);
        if (putid) {
            return res
                .status(200)
                .json({
                    status: "SUCCESS",
                    msg: "Product modified.",
                    data: putid,
                })
        }
    } catch (err) {
        res.status(500).send({
            status: "ERROR",
            msg: err.message,
            data: {},
        })
    }
});


productsRouter.delete("/:pid", (req, res) => {

    try {
        let id = req.params.pid;
        let deleid = newProductManager.deleteProduct(id);

        if (deleid) {
            return res
                .status(200)
                .json({
                    status: "SUCCESS",
                    msg: "Product eleminated.",
                    data: {},
                })
        }
    } catch (err) {
        res.status(500).send({
            status: "ERROR",
            msg: err.message,
            data: {},
        })
    }
});




