import assert from "assert";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { comparePasswords, hashData } from "../core/helpers";
import Injector from "../di/injector";

export type Auth = {
    isSignup: boolean;
    isLogin: boolean;
}

export type Rental = {
    isRental: boolean;
}


export const validateToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const headers = req.headers["authorization"];
        if (!headers) {
            res.status(401).json({
                "message": "authorizatoin failed"
            }).end();
        }
        /// the authorization header has two strings Bearer and the token 
        /// [1] returns the token
        const token = headers!.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || "");
        next();
    } catch (error) {
        res.status(401).json({
            "message": "authorizatoin failed"
        }).end();
    }
}

export const validateRentalInput = async (req: Request, res: Response, next: NextFunction) => {
    try {
        assert((req.body as Map<any, any>).has("name"));
        assert((req.body as Map<any, any>).has("startDate"));
        assert((req.body as Map<any, any>).has("endDate"));
        assert((req.body as Map<any, any>).has("password"));
        assert(req.body.name !== undefined || null);
        assert(req.body.startDate !== undefined || null);
        assert(req.body.endDate !== undefined || null);
        assert(req.body.password !== undefined || null);

        next();
    } catch (error) {
        res.status(401).json({
            "message": "invalid input data"
        }).end();
    }
}

export const validateAuthInput = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // assert((req.body as Map<any, any>).has("name"));
        // assert((req.body as Map<any, any>).has("email"));
        // assert((req.body as Map<any, any>).has("password"));
        assert(req.body.name !== undefined || null);
        assert(req.body.email !== undefined || null);
        assert(req.body.password !== undefined || null);

        next();
    } catch (error) {
        res.status(401).json({
            "message": "invalid auth input data"
        }).end();
    }
}

export const refineAuthInput = async (req: Request, res: Response, next: NextFunction) => {
    /// Name with at least 4 digits
    /// Name without special characters ^ < > ( ) \[ \] \\\ / . , ; : \s @ ’
    /// E-mail must have @
    /// Domain name with at least 4 digits
    /// Domain name without special characters ^ < > ( ) \[ \] \\\ / . , ; : \s @ ’
    /// Domain extension only .com or .net
    const emailRegex: RegExp = /([A-Z]|[a-z]|[^<>()\[\]\\\/.,;:\s@"]){4,}\@([A-Z]|[a-z]|[^<>()\[\]\\\/.,;:\s@"]){4,}\.(com|net)/;

    if (!emailRegex.test(req.body.email)) res.status(401).json({ "message": "invalid email credentials" }).end();

    /// Password at least 6 digits.
    /// At least one lowercase
    /// At least one uppercase
    /// At least one special character from @ # $ % ^ & *
    const passwordRegex: RegExp = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/;
    if (!passwordRegex.test(req.body.password)) res.status(401).json({ "message": "invalid password credentials" }).end();
    next();
}


export const validateLoginPassword = async (req: Request, res: Response, next: NextFunction) => {
    const requestPassword = req.body.password;
    const newlyEncryptedPassword = await hashData(requestPassword);
    const returnType = await Injector.db.get({ isUser: true, user: { email: req.body.email, password: newlyEncryptedPassword, name: req.body.name }, rent: null });

    if (returnType === null || returnType === undefined) {
        res.status(404).json({
            "message": "user not found"
        }).end();
    }

    try {
        const { user } = returnType!;
        const oldEncryptedPassword = user!.password;

        if (!await comparePasswords(newlyEncryptedPassword, oldEncryptedPassword)) res.status(404).json({
            "message": "invalid login credentials"
        }).end();

        next();
    } catch (error) {
        res.status(500).json({
            "message": "server error"
        }).end()
    }
}