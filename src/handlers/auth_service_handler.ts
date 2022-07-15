import { NextFunction, Request, Response } from "express";
import { comparePasswords, encryptData, generateAccessToken } from "../core/helpers";
import DatabaseService from "../db/db_service";
import { DatabaseParam, UserParam } from "../interfaces/database_service_param";

export default class AuthServiceHandler {
    dbService: DatabaseService<DatabaseParam>;

    constructor(dbService: DatabaseService<DatabaseParam>) {
        this.dbService = dbService;
    }

    async signup(req: Request, res: Response, next: NextFunction): Promise<void> {
        // hash password with bycrypt and insert user data into db
        const encryptedPassword = await encryptData(req.body.password);

        const userData: UserParam = {
            email: req.body.email,
            password: encryptedPassword,
            name: req.body.email,
        }
        try {
            await this.dbService.create({ user: userData, rent: null, isUser: true });

            const accessToken = await generateAccessToken(req);
            res.setHeader("authorization", `Bearer ${accessToken}`);

            res.status(200).set("content-type", "application/json").json(userData).end();
        } catch (error) {
            // testing
            console.log("error was caught");

            res.status(404).json({
                "message": "user already exists"
            }).end();
        }

    }

    async login(req: Request, res: Response, next: NextFunction): Promise<void> {

        // double check password
        const requestPassword = req.body.password;
        const newlyEncryptedPassword = await encryptData(requestPassword);
        const returnType = await this.dbService.get({ isUser: true, user: { email: req.body.email, password: newlyEncryptedPassword, name: req.body.name }, rent: null });

        if (returnType === null || returnType === undefined) {
            res.status(404).json({
                "message": "user not found"
            })
        }
        try {
            const { user } = returnType!;
            const oldEncryptedPassword = user!.password;

            if (!await comparePasswords(newlyEncryptedPassword, oldEncryptedPassword)) res.status(404).json({
                "message": "invalid login credentials"
            });
            const accessToken = encryptData(req);
            res.setHeader("authorization", `Bearer ${accessToken}`);
            res.status(200).json({
                "message": "login succesful"
            })
        } catch (error) {
            res.status(500).json({
                "message": "server error"
            })
        }
    }
}