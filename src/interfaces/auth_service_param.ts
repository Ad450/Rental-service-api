import { NextFunction, Request, Response } from "express";


export type AuthServiceParam = {
    req: Request,
    res: Response,
    next: NextFunction;
}