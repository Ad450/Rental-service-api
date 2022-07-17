"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../core/helpers");
const response_handler_1 = __importDefault(require("../response_handlers/response_handler"));
class RentalServiceHandler {
    constructor(dbService) {
        this.dbService = dbService;
    }
    async rentBook(req, res, next) {
        const encryptedPassword = await (0, helpers_1.hashData)(req.body.password);
        const hash = await (0, helpers_1.hashData)(req.body.name);
        try {
            const book = await this.dbService.get({
                isUser: false,
                user: null,
                rent: {
                    name: req.body.name,
                    hash: hash,
                    /// params below are not needed to retrieve book
                    /// exist to escape missing params in type rent: RentalParams
                    isRented: true,
                    rentedBy: encryptedPassword,
                    startDate: req.body.startDate,
                    endDate: req.body.endDate,
                },
            });
            if (book === null || undefined) {
                this.dbService.create({
                    isUser: false,
                    rent: {
                        name: req.body.name,
                        hash: hash,
                        isRented: true,
                        rentedBy: encryptedPassword,
                        startDate: req.body.startDate,
                        endDate: req.body.endDate,
                    },
                    user: null,
                });
            }
            else if (book) {
                this.dbService.update({
                    isUser: false,
                    rent: {
                        name: req.body.name,
                        hash: hash,
                        isRented: true,
                        rentedBy: encryptedPassword,
                        startDate: req.body.startDate,
                        endDate: req.body.endDate,
                    },
                    user: null
                });
            }
            res.status(200).json(response_handler_1.default.responseJson(response_handler_1.default.responses.bookRented)).end();
        }
        catch (error) {
            console.log(error);
            res.status(500).json(response_handler_1.default.responseJson(response_handler_1.default.responses.serverError)).end();
        }
    }
    async turnInBook(req, res) {
        const hash = await (0, helpers_1.hashData)(req.body.name);
        try {
            await this.dbService.update({
                isUser: false,
                rent: {
                    name: req.body.name,
                    hash: hash,
                    isRented: false,
                    rentedBy: "",
                    startDate: "",
                    endDate: "",
                },
                user: null
            });
            res.status(200).json(response_handler_1.default.responseJson(response_handler_1.default.responses.bookHandedIn));
        }
        catch (error) {
            res.status(500).json(response_handler_1.default.responseJson(response_handler_1.default.responses.serverError));
        }
    }
    async getBook(req, res) {
        const encryptedPassword = await (0, helpers_1.encryptData)(req);
        const hash = await (0, helpers_1.hashData)(req.body.name);
        try {
            const book = await this.dbService.get({
                isUser: false,
                user: null,
                rent: {
                    name: req.body.name,
                    hash: hash,
                    // params below are not needed to retrieve book
                    // exist to escape missing params in type rent: RentalParams
                    isRented: true,
                    rentedBy: encryptedPassword,
                    startDate: req.body.startDate,
                    endDate: req.body.endDate,
                },
            });
            if (book === null || undefined) {
                res.status(500).json(response_handler_1.default.responseJson(response_handler_1.default.responses.serverError));
            }
            const { rent } = book;
            const bookFromDB = {
                id: rent.id,
                name: rent.name,
                hash: rent.hash,
                isRented: rent.isRented,
                rentedBy: rent.rentedBy,
                startDate: rent.startDate,
                endDate: rent.endDate
            };
            return bookFromDB;
        }
        catch (error) {
            res.status(500).json(response_handler_1.default.responseJson(response_handler_1.default.responses.serverError));
            return null;
        }
    }
}
exports.default = RentalServiceHandler;
