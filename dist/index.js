"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv = __importStar(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const endpoints_1 = require("./Routers/endpoints");
const prisma_db_setup_1 = require("./db/prisma_db_setup");
dotenv.config();
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
/// index of routes in Endpoints array defined in Routers/endpoints
const signupIndex = 0;
const loginIndex = 1;
const getUserIndex = 2;
const getAllUsersIndex = 3;
const rentBookIndex = 4;
const turnInBookIndex = 5;
const getBookIndex = 6;
const getAllBooksIndex = 7;
app.post(endpoints_1.routers[signupIndex].route, endpoints_1.routers[signupIndex].middlewares, endpoints_1.routers[signupIndex].handlers);
app.post(endpoints_1.routers[loginIndex].route, endpoints_1.routers[loginIndex].middlewares, endpoints_1.routers[loginIndex].handlers);
app.post(endpoints_1.routers[getUserIndex].route, endpoints_1.routers[getUserIndex].middlewares, endpoints_1.routers[getUserIndex].handlers);
app.post(endpoints_1.routers[getAllUsersIndex].route, endpoints_1.routers[getAllUsersIndex].middlewares, endpoints_1.routers[getAllUsersIndex].handlers);
app.post(endpoints_1.routers[rentBookIndex].route, endpoints_1.routers[rentBookIndex].middlewares, endpoints_1.routers[rentBookIndex].handlers);
app.post(endpoints_1.routers[turnInBookIndex].route, endpoints_1.routers[turnInBookIndex].middlewares, endpoints_1.routers[turnInBookIndex].handlers);
app.post(endpoints_1.routers[getBookIndex].route, endpoints_1.routers[getBookIndex].middlewares, endpoints_1.routers[getBookIndex].handlers);
app.post(endpoints_1.routers[getAllBooksIndex].route, endpoints_1.routers[getAllBooksIndex].middlewares, endpoints_1.routers[getAllBooksIndex].handlers);
const startApp = async () => {
    try {
        app.listen(process.env.SERVER_PORT || 3000, () => {
            console.log("sever started on port " + process.env.SERVER_PORT + ", more fire");
        });
        await (0, prisma_db_setup_1.connectPrisma)();
    }
    catch (error) {
        console.log(error);
    }
};
/// Program execution starts here
startApp();
