import { NextFunction, Request, Response } from "express";

export default interface UsecaseParam {
    req: Request,
    res: Response,
    next: NextFunction,
}