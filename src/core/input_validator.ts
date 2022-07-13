import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

export type Auth = {
    isSignup: boolean;
    isLogin: boolean;
}

export type Rental = {
    isRental: boolean;
}

export const validateInput = async (req: Request, res: Response, isAuth: Auth, isRental: Rental) => {
    // check for nullability of input fields
    if (isAuth.isSignup || isAuth.isLogin) {
        if (!(req.body as Map<any, any>).has("email") && !(req.body as Map<any, any>).has("password")) {
            res.status(401).json({
                // TODO: to handle responses properly
                "message": "invalid data"
            })
        }

        if (req.body.email === null || undefined && req.body.password === null) {
            res.status(401).json({
                // TODO: to handle responses properly
                "message": "invalid data"
            })
        }
    }

    if (isAuth.isLogin || isRental.isRental) {
        // validate jwt 
        try {
            const authorizationHeader = req.headers["authorization"];
            if (authorizationHeader === undefined || authorizationHeader === null) {
                res.status(401).json({
                    "message": "authorization failed"
                })
            }
            // note: " " in split in the split method is the separator object. 
            const token = authorizationHeader!.split(" ")[1];
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || "");
        } catch (error) {
            res.status(401).json({
                "message": "authorization failed"
            })
        }

    }
}

export const generateAccessToken = async (req: Request): Promise<string> => {
    try {
        const accessToken = jwt.sign(req.body, process.env.ACCESS_TOKEN_SECRET || "");
        return accessToken;
    } catch (error) {
        // will do a proper error handling
        throw new Error("Access token generation failed");
    }
}

export const encryptPassword = async (req: Request): Promise<string> => {
    try {
        const salt = await bcrypt.genSalt(3);
        return await bcrypt.hash(req.body.password, salt);
    } catch (error) {
        throw new Error("encryption failed");
    }
}

export const comparePasswords = async (input: string, existingPassword: string): Promise<boolean> => {
    try {
        const results = await bcrypt.compare(input, existingPassword);
        return results
    } catch (error) {
        throw new Error("password comparison failed");
    }
}