import express  from "express";
import { ProductServise } from "../services/products.service.js";

export const home = express.Router();

home.get("/", async (req, res) => {

    try {
        const { limit } = req.query;
        const products = await ProductServise.getAllAlone();
        if (limit) {
            const limitprod = products.slice(0, parseInt(limit))
            res.status(200).render("home",{limitprod});

        } else {
            res.status(200).render("home",{products});
        }
    }
    catch (err) {
        res.status(500).send({
            status: "ERROR",
            msg: err.message,
            data: {},
        })
    }

});

