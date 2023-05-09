
import ProductManager from './ProductManager.js';
import express from 'express';
const newProductManager = new ProductManager('./desafio3.json');


const prod1 = {
    title: "Trial 1",
    description: "Product trial",
    price: 200,
    thumbnail: "none",
    code: "3331",
    stock: 5,
};

const prod2 = {
    title: "Trial 2",
    description: "Product trial",
    price: 300,
    thumbnail: "none",
    code: "3332",
    stock: 6,
};

const prod3 = {
    title: "Trial 3",
    description: "Product trial",
    price: 20440,
    thumbnail: "none",
    code: "3333",
    stock: 3,
};

const prod4 = {
    title: "Trial 4",
    description: "Product trial",
    price: 2600,
    thumbnail: "none",
    code: "3334",
    stock: 17,
};

const prod5 = {
    title: "Trial 5",
    description: "Product trial",
    price: 666,
    thumbnail: "none",
    code: "3335",
    stock: 21,
};

const prod6 = {
    title: "Trial 6",
    description: "Product trial",
    price: 2332,
    thumbnail: "none",
    code: "3336",
    stock: 7,
};

const prod7 = {
    title: "Trial 7",
    description: "Product trial",
    price: 222,
    thumbnail: "none",
    code: "3337",
    stock: 53,
};

const prod8 = {
    title: "Trial 8",
    description: "Product trial",
    price: 555,
    thumbnail: "none",
    code: "3338",
    stock: 1,
};

const prod9 = {
    title: "Trial 9",
    description: "Product trial",
    price: 200,
    thumbnail: "none",
    code: "3339",
    stock: 235,
};

const prod10 = {
    title: "Trial 10",
    description: "Product trial",
    price: 200,
    thumbnail: "none",
    code: "33310",
    stock: 25,
};



newProductManager.addProduct(prod1);
newProductManager.addProduct(prod2);
newProductManager.addProduct(prod3);
newProductManager.addProduct(prod4);
newProductManager.addProduct(prod6);
newProductManager.addProduct(prod7);
newProductManager.addProduct(prod8);
newProductManager.addProduct(prod9);
newProductManager.addProduct(prod10);


const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Welcome to my humble page.");
});

app.get("/products", async(req, res) => {
    try {
    const  limit  = req.query.limit;
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
    
    try {let idid = req.params.pid;
    let idEncontrado = await newProductManager.getProductById(idid);
    if (idEncontrado) {
        res.json(idEncontrado);
    } else {
        res.status(400).json({ Error: "Product not found" })
    }
} catch (err) {
    res.status(204).json({ Error: "Product doesn't exist" });
}
});

app.listen(PORT, () => {
    console.log(`Example app listening http://localhost:${PORT}`);
});