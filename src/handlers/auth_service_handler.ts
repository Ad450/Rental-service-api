import { NextFunction, Request, Response } from "express";
import { comparePasswords, encryptPassword, generateAccessToken, validateInput } from "../core/input_validator";
import { Auth, Rental } from "../core/input_validator";
import DatabaseService from "../db/db_service";
import { UserModel } from "../db/db_setup";
import { DatabaseParam, UserParam } from "../interfaces/database_service_param";

export const handleLogin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

}


export const handleSignup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

}


export default class AuthServiceHandler {
    dbService: DatabaseService<DatabaseParam>;

    constructor(dbService: DatabaseService<DatabaseParam>) {
        this.dbService = dbService;
    }

    async signup(req: Request, res: Response, next: NextFunction): Promise<void> {
        await validateInput(req, res, { isSignup: true, isLogin: false }, { isRental: false });

        const accessToken = await generateAccessToken(req);
        res.setHeader("authorization", `Bearer ${accessToken}`);

        // hash password with bycrypt and insert user data into db
        const encryptedPassword = await encryptPassword(req.body.password);

        const userData: UserParam = {
            email: req.body.email,
            password: encryptedPassword,
        }

        this.dbService.create({ user: userData, rent: null, isUser: true });
        res.status(200).set("content-type", "application/json").json(userData);
    }

    async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        await validateInput(req, res, { isSignup: false, isLogin: true }, { isRental: false });

        // double check password
        const requestPassword = req.body.password;
        const newlyEncryptedPassword = await encryptPassword(requestPassword);
        const returnType = await this.dbService.get({ isUser: true, user: { email: req.body.email, password: newlyEncryptedPassword }, rent: null });

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
            const accessToken = encryptPassword(req);
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