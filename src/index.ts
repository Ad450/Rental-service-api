import express from "express";
import * as dotenv from "dotenv";
import bodyParser from "body-parser";
import { routers } from "./Routers/endpoints";
import { connectMongoose } from "./db/db_setup";

dotenv.config();

const app = express();

app.use(bodyParser.json());


const signupIndex = 0;
const loginIndex = 1;
const getUserIndex = 2;
const getAllUsersIndex = 3;
const rentBookIndex = 4;
const turnInBookIndex = 5;
const getBookIndex = 6;
const getAllBooksIndex = 7;


app.post(routers[signupIndex].route, routers[signupIndex].middlewares, routers[signupIndex].handlers);
app.post(routers[loginIndex].route, routers[loginIndex].middlewares, routers[loginIndex].handlers);
app.post(routers[getUserIndex].route, routers[getUserIndex].middlewares, routers[getUserIndex].handlers);
app.post(routers[getAllUsersIndex].route, routers[getAllUsersIndex].middlewares, routers[getAllUsersIndex].handlers);
app.post(routers[rentBookIndex].route, routers[rentBookIndex].middlewares, routers[rentBookIndex].handlers);
app.post(routers[turnInBookIndex].route, routers[turnInBookIndex].middlewares, routers[turnInBookIndex].handlers);
app.post(routers[getBookIndex].route, routers[getBookIndex].middlewares, routers[getBookIndex].handlers);
app.post(routers[getAllBooksIndex].route, routers[getAllBooksIndex].middlewares, routers[getAllBooksIndex].handlers);

const startApp = async () => {
    try {
        app.listen(process.env.SERVER_PORT || 3000, () => {
            console.log("sever started on port " + process.env.SERVER_PORT + ", more fire");
        });
        await connectMongoose()
    } catch (error) {
        console.log(error);
    }
}

/// execution starts here 
startApp();
