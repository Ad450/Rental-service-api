"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RentBook {
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
            this.rentService.rentBook(serviceParams);
        }
        catch (error) {
            console.warn(error);
        }
    }
}
exports.default = RentBook;
