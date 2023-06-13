import express from 'express';
import handlebars from "express-handlebars";
import path from "path";
import { _dirname } from './config.js';
import ProductManager from './DAO/productManager.js';
import { chatRouter } from './routes/chat.router.js';
import { home } from './routes/home.router.js';
import { realtime } from "./routes/realtimeproducts.router.js";
import { productsRouter } from './routes/users.products.js';
import { usersRouter } from './routes/users.router.js';
import { connectSocketServer } from "./utils/socketServer.js";
import { connectMongo } from './utils/dbConnecton.js';



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


// SERVER

const httpServer = app.listen(PORT, () => {
    console.log(`Example app listening http://localhost:${PORT}`);
});

connectSocketServer(httpServer);
