import express from 'express';
import handlebars from "express-handlebars";
import { chatRouter } from './routes/chat.router.js';
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

app.use("/realtimeproducts", realtime)

//CHAT

app.use("/chat", chatRouter)

app.get("*", (req, res) => {
    res.send("Welcome to my humble page.")
})


// CONFIG DEL MOTOR DE PLANTILLAS

app.engine("handlebars", handlebars.engine());
app.set("views", path.join(_dirname, "views"));
app.set("view engine", "handlebars");

//SERVER

const httpServer = app.listen(PORT, () => {
    console.log(`Example app listening http://localhost:${PORT}`);
});

const socketserver = new Server(httpServer);

let msgs = [];

socketserver.on("connection", (socket) => {
    console.log(`New clinet: ${socket.id}`);

    socket.on("new-product", async (title, description, price, thumbnail, code, stock) => {
        try {
            await appManager.addProduct({ title, description, price, thumbnail, code, stock });

            const productsList = await appManager.getProducts();
            console.log(productsList);
            socketserver.emit("products", productsList);
        } catch (err) {
            console.log(err);
        }
    });

    socket.on("delete-product", async (productId) => {
        try {
            appManager.deleteProduct(productId);

            const productsList = await appManager.getProducts();
            console.log(productsList);
            socketserver.emit("products", productsList);
        } catch (err) {
            console.log(err);
        }
    });

    socket.on("msg_front_to_back", async (msg) => {
            msgs.push(msg);
            // console.log(msgs)
            socketserver.emit("listado_de_msgs", msgs)
        });
});
