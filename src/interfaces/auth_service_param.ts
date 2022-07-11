import { NextFunction, Request, Response } from "express";

export default interface AuthServiceParam {
    req: Request,
    res: Response,
    next: NextFunction;
}