"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../core/helpers");
const response_handler_1 = __importDefault(require("../response_handlers/response_handler"));
class RentalServiceHandler {
    constructor(bookDatabase) {
        this.bookDatabase = bookDatabase;
    }
    async rentBook(req, res, next) {
        const encryptedPassword = await (0, helpers_1.hashData)(req.body.password, req.body.startDate);
        const hash = await (0, helpers_1.hashData)(req.body.name, req.body.name);
        console.log(req.body);
        try {
            const book = await this.bookDatabase.retrieveOne(parseInt(req.body.id));
            if (!book) {
                this.bookDatabase.create({
                    name: req.body.name,
                    hash: hash,
                    rented: true,
                    rentedBy: encryptedPassword,
                    startDate: req.body.startDate,
                    endDate: req.body.endDate,
                });
            }
            else if (book) {
                this.bookDatabase.update({
                    name: req.body.name,
                    hash: hash,
                    rented: true,
                    rentedBy: encryptedPassword,
                    startDate: req.body.startDate,
                    endDate: req.body.endDate,
                });
            }
            res
                .status(200)
                .json(response_handler_1.default.responseJson(response_handler_1.default.responses.bookRented))
                .end();
        }
        catch (error) {
            console.log(error);
            res
                .status(500)
                .json(response_handler_1.default.responseJson(response_handler_1.default.responses.serverError))
                .end();
        }
    }
    async turnInBook(req, res) {
        const hash = await (0, helpers_1.hashData)(req.body.password, req.body.startDate);
        try {
            const book = await this.bookDatabase.retrieveOne(Number(req.params.name));
            if (!book) {
                res
                    .status(200)
                    .json(response_handler_1.default.responseJson(response_handler_1.default.responses.bookNotFound))
                    .end();
            }
            else {
                await this.bookDatabase.update({
                    name: req.body.name,
                    hash: hash,
                    rented: false,
                    rentedBy: "",
                    startDate: "",
                    endDate: "",
                });
                res
                    .status(200)
                    .json(response_handler_1.default.responseJson(response_handler_1.default.responses.bookHandedIn));
            }
        }
        catch (error) {
            res
                .status(500)
                .json(response_handler_1.default.responseJson(response_handler_1.default.responses.serverError));
        }
    }
    async getBook(req, res) {
        const encryptedPassword = await (0, helpers_1.encryptData)(req);
        const hash = await (0, helpers_1.hashData)(req.body.password, req.body.startDate);
        try {
            const book = await this.bookDatabase.retrieveOne(Number(req.params.name));
            if (book === null || undefined) {
                res
                    .status(500)
                    .json(response_handler_1.default.responseJson(response_handler_1.default.responses.serverError))
                    .end();
                return null;
            }
            else {
                res.status(200).json(JSON.stringify(book)).end();
                return book;
            }
        }
        catch (error) {
            res
                .status(500)
                .json(response_handler_1.default.responseJson(response_handler_1.default.responses.serverError));
            return null;
        }
    }
    async getAllBooks(req, res, next) {
        try {
            const books = await this.bookDatabase.retrieve();
            if (!books)
                res
                    .status(500)
                    .json(response_handler_1.default.responseJson(response_handler_1.default.responses.serverError))
                    .end();
            else if (books.length === 0) {
                res
                    .status(500)
                    .json(response_handler_1.default.responseJson(response_handler_1.default.responses.serverError))
                    .end();
            }
            else {
                res.status(200).json(JSON.stringify(books)).end();
            }
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.default = RentalServiceHandler;
