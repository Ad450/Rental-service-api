"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Login {
    constructor(authService) {
        this.authService = authService;
    }
    async call(param) {
        const { req, res, next } = param;
        const serviceParams = {
            req: req,
            res: res,
            next: next
        };
        try {
            this.authService.login(serviceParams);
        }
        catch (error) {
            console.warn(error);
        }
    }
}
exports.default = Login;
