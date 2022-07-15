import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import * as bcrypt from 'bcrypt';


dotenv.config();


export const generateAccessToken = async (req: Request): Promise<string> => {
    try {
        const accessToken = jwt.sign(req.body, process.env.ACCESS_TOKEN_SECRET || "");
        return accessToken;
    } catch (error) {
        // will do a proper error handling
        throw new Error("Access token generation failed");
    }
}

export const encryptData = async (req: Request): Promise<string> => {
    // try {
    //     const salt = await bcrypt.genSalt(3);
    //     const hash = await bcrypt.hash(req.body.password.toString(), salt);
    //     return hash;
    // } catch (error) {
    //     throw new Error("encryption failed");
    //}

    //testing with random string
    return "0xer3232453";
}

export const comparePasswords = async (input: string, existingPassword: string): Promise<boolean> => {
    try {
        const results = await bcrypt.compare(input, existingPassword);
        return results
    } catch (error) {
        throw new Error("password comparison failed");
    }
}


export const hashData = async (input: string): Promise<string> => {
    try {
        const salt = await bcrypt.genSalt(3);
        const results = await bcrypt.hash(input, salt);
        return results
    } catch (error) {
        throw new Error("password comparison failed");
    }
}

