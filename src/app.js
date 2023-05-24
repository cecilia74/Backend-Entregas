import express from 'express';
import handlebars from "express-handlebars";
import path from "path";
import { testPlantillaProducts } from "./routes/test-plantilla.js";
import { productsRouter } from './routes/users.products.js';
import { _dirname } from "./utils.js";
import { Server } from 'socket.io';
import { testSocketRouter } from './routes/test-socket.router.js';
const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));


app.use("/api/products", productsRouter);


// DEVOLVER HTML
app.use("/test-plantilla-products", testPlantillaProducts);

// SOCKET
app.use("/test-socket", testSocketRouter)

app.get("*", (req, res) => {
    res.send("Welcome to my humble page.")
})


// CONFIG DEL MOTOR DE PLANTILLAS
app.engine("handlebars", handlebars.engine());
app.set("views", path.join(_dirname, "views"));
app.set("view engine", "handlebars");



const httpServer = app.listen(PORT, () => {
    console.log(`Example app listening http://localhost:${PORT}`);
});

const socketserver = new Server(httpServer);

socketserver.on("connection", (socket) => {
    console.log(socket.id + "quedo conectado al socket")
});

socket.on("new-product", async (newProd) => {
    try {
        await ProductManager.addProduct({ ...newProd });

        // Actualizar lista después de agregar producto
        const productsList = await productManager.getProducts();
        console.log(productsList);
        socketserver.emit("products", productsList);
    } catch (err) {
        console.log(err);
    }
});

socket.on("delete-product", async (productId) => {
    try {
        await ProductManager.deleteProduct(productId);

        // Actualizar lista después de eliminar producto
        const productsList = await productManager.getProducts();
        console.log(productsList);
        socketserver.emit("products", productsList);
    } catch (err) {
        console.log(err);
    }
});

