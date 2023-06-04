import express from 'express';
import handlebars from "express-handlebars";
import { chatRouter } from './routes/chat.router.js';
import path from "path";
import { realtime } from "./routes/realtimeproducts.router.js";
import { productsRouter } from './routes/users.products.js';
import { usersRouter } from './routes/users.router.js';
import { _dirname } from "./utils.js";
import { Server } from 'socket.io';
import { home } from './routes/home.router.js';
import ProductManager from './logic/ProductManager.js';
import { connect } from 'mongoose';



const appManager = new ProductManager();
const app = express();
const PORT = 8080;

connectMongo();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));


app.use("/api/products", productsRouter);
app.use("/api/users", usersRouter);


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

// CONNECT TO MONGO

export async function connectMongo() {
    try {
        await connect(
            "mongodb+srv://ceciliaponce28:mHey2UVhS8P29Yhr@proyectos-backend.qr0fbhz.mongodb.net/?retryWrites=true&w=majority"
        );
        console.log("plug to mongo!");
    } catch (e) {
        console.log(e);
        throw "can not connect to the db";
    }
}


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
