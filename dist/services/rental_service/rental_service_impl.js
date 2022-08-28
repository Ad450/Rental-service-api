"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RentalServiceImpl {
    constructor(rentalServiceHandler) {
        this.rentalServiceHandler = rentalServiceHandler;
    }
    async rentBook(param) {
        const { req, res, next } = param;
        try {
            this.rentalServiceHandler.rentBook(req, res, next);
        }
        catch (error) {
            // TODO: use logger
            console.log(error);
        }
    }
    async turnInBook(param) {
        const { req, res, next } = param;
        try {
            this.rentalServiceHandler.turnInBook(req, res);
        }
        catch (error) {
            // TODO: use logger
            console.log(error);
        }
    }
    async getBook(param) {
        const { req, res, next } = param;
        try {
            await this.rentalServiceHandler.getBook(req, res);
        }
        catch (error) {
            // TODO: use logger
            console.log(error);
        }
    }
    async getAllBook(param) {
        console.log("I got here");
    }
}
exports.default = RentalServiceImpl;
