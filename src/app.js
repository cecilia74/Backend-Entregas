import express from 'express';
import handlebars from "express-handlebars";
import path from "path";
import { realtime } from "./routes/realtimeproducts.router.js";
import { productsRouter } from './routes/users.products.js';
import { _dirname } from "./utils.js";
import { Server } from 'socket.io';
import { home } from './routes/home.router.js';
import ProductManager from './logic/ProductManager.js';

const appManager = new ProductManager();
const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));


app.use("/api/products", productsRouter);


// DEVOLVER HTML
app.use("/home", home)
// SOCKET
app.use("/realtimeproducts", realtime)

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
    console.log(`New clinet: ${socket.id}`);

    socket.on("new-product", async (title, description, price, thumbnail, code, stock) => {
        try {
            await appManager.addProduct({ title, description, price, thumbnail, code, stock });

            // Actualizar lista después de agregar producto
            const productsList = await app.getProducts();
            console.log(productsList);
            socketserver.emit("products", productsList);
        } catch (err) {
            console.log(err);
        }
    });

    socket.on("delete-product", async (productId) => {
        try {
            appManager.deleteProduct(productId);

            // Actualizar lista después de eliminar producto
            const productsList = await appManager.getProducts();
            console.log(productsList);
            socketserver.emit("products", productsList);
        } catch (err) {
            console.log(err);
        }
    });
});
