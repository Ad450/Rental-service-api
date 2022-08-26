"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GetUser {
    constructor(authService) {
        this.authService = authService;
    }
    async call(param) {
        const { req, res, next } = param;
        const serviceParams = {
            req: req,
            res: res,
            next: next,
        };
        try {
            this.authService.getUser(serviceParams);
        }
        catch (error) {
            console.warn(error);
        }
    }
}
exports.default = GetUser;
