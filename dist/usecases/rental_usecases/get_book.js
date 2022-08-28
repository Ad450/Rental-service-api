"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GetBook {
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
            this.rentService.getBook(serviceParams);
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.default = GetBook;
