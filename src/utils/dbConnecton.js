import { connect } from 'mongoose';


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
