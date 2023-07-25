import express from 'express';
import handlebars from "express-handlebars";
import path from "path";
import { _dirname } from './config.js';
import { cartRouter } from './routes/carts.routes.js';
import { chatRouter } from './routes/chat.routes.js';
import { home } from './routes/home.routes.js';
import { productsRouter } from './routes/products.routes.js';
import { realtime } from "./routes/realtimeproducts.routes.js";
import { usersRouter } from './routes/users.routes.js';
import { connectMongo } from './utils/dbConnecton.js';
import { connectSocketServer } from "./utils/socketServer.js";
import session from 'express-session';
import { sessionsRouter } from './routes/sessions.routes.js';
import FileStore from 'session-file-store';
import MongoStore from 'connect-mongo';

const app = express();
const PORT = 8080;
const fileStore = FileStore(session);

connectMongo();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));
app.use(session({
    secret: 'un-re-secreto',
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://ceciliaponce28:mHey2UVhS8P29Yhr@proyectos-backend.qr0fbhz.mongodb.net/",
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
        ttl: 15
    })
}));


app.use("/api/products", productsRouter);
app.use("/api/users", usersRouter);
app.use("/api/carts", cartRouter);
app.use("/api/session", sessionsRouter);

// DEVOLVER HTML

app.use("/", home);

app.use("/realtimeproducts", realtime)

//CHAT

app.use("/chat", chatRouter)

app.get("*", (req, res) => {
    res.send(console.log(`Welcome to my humble page.`))
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
