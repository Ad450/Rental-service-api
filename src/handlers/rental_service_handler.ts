import { NextFunction, Request, Response } from "express";
import {
    encryptData as encryptPassword,
    hashData,
} from "../core/helpers";
import DatabaseService from "../db/db_service";
import { DatabaseParam, BookFromDb } from "../interfaces/database_service_param";
import ApiResponse from "../response_handlers/response_handler";

export default class RentalServiceHandler {
    dbService: DatabaseService<DatabaseParam>;

    constructor(dbService: DatabaseService<DatabaseParam>) {
        this.dbService = dbService;
    }

    async rentBook(req: Request, res: Response, next: NextFunction) {
        const encryptedPassword = await hashData(req.body.password);
        const hash = await hashData(req.body.name);

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
            } else if (book) {

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
                })
            }

            res.status(200).json(ApiResponse.responseJson(ApiResponse.responses.bookRented)).end();

        } catch (error) {
            console.log(error);

            res.status(500).json(ApiResponse.responseJson(ApiResponse.responses.serverError)).end();
        }

    }

    async turnInBook(req: Request, res: Response) {
        const hash = await hashData(req.body.name);

        try {
            await this.dbService.update({
                isUser: false,
                rent: {
                    name: req.body.name,
                    hash: hash,
                    isRented: false,
                    rentedBy: "", /// clear up all data relating to previous user
                    startDate: "",/// thereby all relating fields are set to empty string values
                    endDate: "",
                },
                user: null
            })
            res.status(200).json(ApiResponse.responseJson(ApiResponse.responses.bookHandedIn));
        } catch (error) {
            res.status(500).json(ApiResponse.responseJson(ApiResponse.responses.serverError));
        }
    }

    async getBook(req: Request, res: Response): Promise<BookFromDb | null> {
        const encryptedPassword = await encryptPassword(req);
        const hash = await hashData(req.body.name);
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
                res.status(500).json(ApiResponse.responseJson(ApiResponse.responses.serverError))
            }

            const { rent } = book!;

            const bookFromDB: BookFromDb = {
                id: rent!.id,
                name: rent!.name,
                hash: rent!.hash,
                isRented: rent!.isRented,
                rentedBy: rent!.rentedBy,
                startDate: rent!.startDate,
                endDate: rent!.endDate
            }
            return bookFromDB;

        } catch (error) {
            res.status(500).json(ApiResponse.responseJson(ApiResponse.responses.serverError));
            return null;
        }
    }
}
