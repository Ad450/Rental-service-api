import { NextFunction, Request, Response } from "express";
import {
    encryptData as encryptPassword,
    hashData,
    validateInput,
} from "../core/helpers";
import DatabaseService from "../db/db_service";
import { BookModel } from "../db/db_setup";
import { DatabaseParam } from "../interfaces/database_service_param";

export default class RentServiceHandler {
    dbService: DatabaseService<DatabaseParam>;

    constructor(dbService: DatabaseService<DatabaseParam>) {
        this.dbService = dbService;
    }

    async rentBook(req: Request, res: Response, next: NextFunction) {
        await validateInput(
            req,
            res,
            { isSignup: false, isLogin: false },
            { isRental: true }
        );
        const encryptedPassword = await encryptPassword(req);
        const hash = await hashData(req.body.name);

        try {
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
        } catch (error) {
            res.status(500).json({
                "message": "server error"
            })
        }

        res.status(200).json({
            "message": "book rented "
        })
    }

    async turnInBook() {

    }
}
