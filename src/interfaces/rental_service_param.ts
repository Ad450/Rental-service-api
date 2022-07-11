import { NextFunction, Request, Response } from "express";

export default interface RentalServiceParam {
    req: Request,
    res: Response,
    next: NextFunction,
}