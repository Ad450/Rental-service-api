import express from "express";
import * as dotenv from "dotenv";
import bodyParser from "body-parser";
import { routers } from "./Routers/endpoints";
import { connectPrisma } from "./db/postgresql/prisma_db_setup";

dotenv.config();

const app = express();

app.use(bodyParser.json());

/// index of routes in Endpoints array defined in Routers/endpoints
const signupIndex = 0;
const loginIndex = 1;
const getUserIndex = 2;
const getAllUsersIndex = 3;
const rentBookIndex = 4;
const turnInBookIndex = 5;
const getBookIndex = 6;
const getAllBooksIndex = 7;

app.post(
  routers[signupIndex].route,
  routers[signupIndex].middlewares,
  routers[signupIndex].handlers
);
app.post(
  routers[loginIndex].route,
  routers[loginIndex].middlewares,
  routers[loginIndex].handlers
);
app.get(
  routers[getUserIndex].route,
  routers[getUserIndex].middlewares,
  routers[getUserIndex].handlers
);
app.get(
  routers[getAllUsersIndex].route,
  routers[getAllUsersIndex].middlewares,
  routers[getAllUsersIndex].handlers
);
app.post(
  routers[rentBookIndex].route,
  routers[rentBookIndex].middlewares,
  routers[rentBookIndex].handlers
);
app.post(
  routers[turnInBookIndex].route,
  routers[turnInBookIndex].middlewares,
  routers[turnInBookIndex].handlers
);
app.get(
  routers[getBookIndex].route,
  routers[getBookIndex].middlewares,
  routers[getBookIndex].handlers
);
app.get(
  routers[getAllBooksIndex].route,
  routers[getAllBooksIndex].middlewares,
  routers[getAllBooksIndex].handlers
);

const startApp = async () => {
  try {
    app.listen(process.env.SERVER_PORT || 3000, () => {
      console.log(
        "server started on port " + process.env.SERVER_PORT + ", more fire"
      );
    });
    await connectPrisma();
  } catch (error) {
    console.log(error);
  }
};

/// Program execution starts here
startApp();
