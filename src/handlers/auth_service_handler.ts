import { NextFunction, Request, Response } from "express";
import {
    comparePasswords,
    encryptData,
    generateAccessToken,
    hashData,
} from "../core/helpers";
import { TrialDatabase } from "../db/db1";
import DatabaseService from "../db/db_service";
import { DatabaseParam, UserParam } from "../interfaces/database_service_param";
import ApiResponse from "../response_handlers/response_handler";
import { User } from "../db/TrialDatabaseImpl";
import { toNamespacedPath } from "path";

export default class AuthServiceHandler {
    dbService: TrialDatabase;

    constructor(dbService: TrialDatabase) {
        this.dbService = dbService;
    }

    async signup(req: Request, res: Response, next: NextFunction): Promise<void> {
        // hash password with bycrypt and insert user data into db
        const encryptedPassword = await hashData(req.body.password);
        console.log(encryptedPassword);

        const userData: UserParam = {
            email: req.body.email,
            password: encryptedPassword,
            name: req.body.email,
        };
        try {
            await this.dbService.create<User>({
                name: req.body.email,
                email: encryptedPassword,
                password: req.body.email,
            });

            const accessToken = await generateAccessToken(req);
            res.setHeader("authorization", `Bearer ${accessToken}`);

            res
                .status(200)
                .set("content-type", "application/json")
                .json(userData)
                .end();
        } catch (error) {
            res
                .status(404)
                .json(ApiResponse.responseJson(ApiResponse.responses.userAlreadyExists))
                .end();
        }
    }

    // async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    //     try {
    //         const accessToken = generateAccessToken(req);
    //         res.setHeader("authorization", `Bearer ${accessToken}`);
    //         res.status(200).json(ApiResponse.responseJson(ApiResponse.responses.loginSuccessful)).end();
    //     } catch (error) {
    //         res.status(500).json(ApiResponse.responseJson(ApiResponse.responses.serverError)).end()
    //     }
    // }
}
