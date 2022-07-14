"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../core/helpers");
class AuthServiceHandler {
    constructor(dbService) {
        this.dbService = dbService;
    }
    async signup(req, res, next) {
        if (await (0, helpers_1.validateInput)(req, res, { isSignup: true, isLogin: false }, { isRental: false }) === false)
            res.end();
        // testing
        console.log(await (0, helpers_1.validateInput)(req, res, { isSignup: true, isLogin: false }, { isRental: false }));
        // hash password with bycrypt and insert user data into db
        const encryptedPassword = await (0, helpers_1.encryptData)(req.body.password);
        const userData = {
            email: req.body.email,
            password: encryptedPassword,
            name: req.body.email,
        };
        try {
            await this.dbService.create({ user: userData, rent: null, isUser: true });
            const accessToken = await (0, helpers_1.generateAccessToken)(req);
            res.setHeader("authorization", `Bearer ${accessToken}`);
            res.status(200).set("content-type", "application/json").json(userData);
        }
        catch (error) {
            // testing
            console.log("error was caught");
            res.status(404).json({
                "message": "user already existing"
            });
            process.exit();
        }
    }
    async login(req, res, next) {
        await (0, helpers_1.validateInput)(req, res, { isSignup: false, isLogin: true }, { isRental: false });
        // double check password
        const requestPassword = req.body.password;
        const newlyEncryptedPassword = await (0, helpers_1.encryptData)(requestPassword);
        const returnType = await this.dbService.get({ isUser: true, user: { email: req.body.email, password: newlyEncryptedPassword, name: req.body.name }, rent: null });
        if (returnType === null || returnType === undefined) {
            res.status(404).json({
                "message": "user not found"
            });
        }
        try {
            const { user } = returnType;
            const oldEncryptedPassword = user.password;
            if (!await (0, helpers_1.comparePasswords)(newlyEncryptedPassword, oldEncryptedPassword))
                res.status(404).json({
                    "message": "invalid login credentials"
                });
            const accessToken = (0, helpers_1.encryptData)(req);
            res.setHeader("authorization", `Bearer ${accessToken}`);
            res.status(200).json({
                "message": "login succesful"
            });
        }
        catch (error) {
            res.status(500).json({
                "message": "server error"
            });
        }
    }
}
exports.default = AuthServiceHandler;
