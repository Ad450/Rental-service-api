"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AuthServiceImpl {
    constructor(authServiceHandler) {
        this.authServiceHandler = authServiceHandler;
    }
    async login(param) {
        const { req, res, next } = param;
        try {
            // await this.authServiceHandler.login(req, res, next);
        }
        catch (error) {
            // will introduce Logger soon!
            console.log(error);
        }
    }
    async signup(param) {
        const { req, res, next } = param;
        try {
            await this.authServiceHandler.signup(req, res, next);
        }
        catch (error) {
            // will introduce Logger soon!
            console.log(error);
        }
    }
    async getAllUsers(param) {
        throw new Error("Method not implemented.");
    }
    async getUser(param) {
        throw new Error("Method not implemented.");
    }
}
exports.default = AuthServiceImpl;
