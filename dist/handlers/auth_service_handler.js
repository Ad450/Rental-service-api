"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../core/helpers");
const response_handler_1 = __importDefault(require("../response_handlers/response_handler"));
class AuthServiceHandler {
    constructor(dbService) {
        this.dbService = dbService;
    }
    async signup(req, res, next) {
        // hash password with bycrypt and insert user data into db
        const encryptedPassword = await (0, helpers_1.hashData)(req.body.password);
        console.log(encryptedPassword);
        const userData = {
            email: req.body.email,
            password: encryptedPassword,
            name: req.body.email,
        };
        try {
            await this.dbService.create({
                isUser: true,
                rent: null,
                user: {
                    email: req.body.email,
                    password: encryptedPassword,
                    name: req.body.email,
                },
            });
            const accessToken = await (0, helpers_1.generateAccessToken)(req);
            res.setHeader("authorization", `Bearer ${accessToken}`);
            res
                .status(200)
                .set("content-type", "application/json")
                .json(userData)
                .end();
        }
        catch (error) {
            // testing
            console.log(error);
            res
                .status(404)
                .json(response_handler_1.default.responseJson(response_handler_1.default.responses.userAlreadyExists))
                .end();
        }
    }
}
exports.default = AuthServiceHandler;
