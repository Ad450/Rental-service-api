"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Signup {
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
            this.authService.signup(serviceParams);
        }
        catch (error) {
            console.warn(error);
        }
    }
}
exports.default = Signup;
