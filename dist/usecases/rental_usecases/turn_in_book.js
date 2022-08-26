"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TurnInBook {
    constructor(rentService) {
        this.rentService = rentService;
    }
    async call(param) {
        const { req, res, next } = param;
        const serviceParams = {
            req: req,
            res: res,
            next: next,
        };
        try {
            this.rentService.turnInBook(serviceParams);
        }
        catch (error) {
            console.warn(error);
        }
    }
}
exports.default = TurnInBook;
