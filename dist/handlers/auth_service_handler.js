"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../core/helpers");
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
            await this.dbService.create({ user: userData, rent: null, isUser: true });
            const accessToken = await (0, helpers_1.generateAccessToken)(req);
            res.setHeader("authorization", `Bearer ${accessToken}`);
            res.status(200).set("content-type", "application/json").json(userData).end();
        }
        catch (error) {
            // testing
            console.log("error was caught");
            res.status(404).json({
                "message": "user already exists"
            }).end();
        }
    }
    async login(req, res, next) {
        try {
            const accessToken = (0, helpers_1.generateAccessToken)(req);
            res.setHeader("authorization", `Bearer ${accessToken}`);
            res.status(200).json({
                "message": "login succesful"
            }).end();
        }
        catch (error) {
            res.status(500).json({
                "message": "server error"
            }).end();
        }
    }
}
exports.default = AuthServiceHandler;
