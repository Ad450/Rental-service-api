"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GetAllBooks {
    constructor(rentService) {
        this.rentService = rentService;
    }
    async call(param) {
        const { req, res, next } = param;
        const serviceParams = {
            req: req,
            res: res,
            next: next
        };
        try {
            this.rentService.getAllBook(serviceParams);
        }
        catch (error) {
            console.warn(error);
        }
    }
}
exports.default = GetAllBooks;
