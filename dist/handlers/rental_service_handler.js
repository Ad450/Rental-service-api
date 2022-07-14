"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../core/helpers");
class RentalServiceHandler {
    constructor(dbService) {
        this.dbService = dbService;
    }
    async rentBook(req, res, next) {
        await (0, helpers_1.validateInput)(req, res, { isSignup: false, isLogin: false }, { isRental: true });
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
        catch (error) {
            res.status(500).json({
                message: "server error",
            });
        }
        res.status(200).json({
            message: "book rented ",
        });
    }
    async turnInBook(req, res) {
        await (0, helpers_1.validateInput)(req, res, { isSignup: false, isLogin: false }, { isRental: true });
        const hash = await (0, helpers_1.hashData)(req.body.name);
        try {
            this.dbService.update({
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
            res.status(200).json({
                "message": "book handed in"
            });
        }
        catch (error) {
            res.status(500).json({
                "message": "server error"
            });
        }
    }
    async getBook(req, res) {
        (0, helpers_1.validateInput)(req, res, { isLogin: false, isSignup: false }, { isRental: true });
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
                res.status(500).json({
                    "message": "server error"
                });
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
            res.status(500).json({
                "message": "server error"
            });
            return null;
        }
    }
}
exports.default = RentalServiceHandler;