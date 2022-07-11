import express from "express";
import * as dotenv from "dotenv";
import bodyParser from "body-parser";

dotenv.config();

const app = express();

app.use(bodyParser.json());

app.listen(process.env.SERVER_PORT, () => {
    console.log("sever started on port " + process.env.SERVER_PORT + ", more fire");
})