
import ProductManager from './ProductManager.js';
import express from 'express';
const newProductManager = new ProductManager('../desafio3.json');


const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Welcome to my humble page.");
});

app.get("/products", async(req, res) => {
    try {
    const  {limit}  = req.query;
    const products = await newProductManager.getProducts();
    if (limit) {
        const limitprod = products.slice(0,parseInt(limit))
        res.status(200).send(limitprod);

    } else {
        console.log(res.status(200).send(products));
    }}
    catch (err) {
        res.status(400).json({ Error: "Product not found" });
    }

});
app.get("/products/:pid", async(req, res) => {
    
    try {
    let idid = req.params.pid;
    let idEncontrado = await newProductManager.getProductById(idid);
    if (idEncontrado) {
        res.status(200).send(idEncontrado);
    } 
    else {
        res.status(400).json({ message: "Product not found" })
    }
    
} catch (err) {
    res.status(400).json({ error: err.message });
}
});

app.listen(PORT, () => {
    console.log(`Example app listening http://localhost:${PORT}`);
});