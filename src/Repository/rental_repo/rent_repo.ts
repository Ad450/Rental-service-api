import { NextFunction, Request, Response } from "express";

export default abstract class RentRepository {
    abstract rentBook(req: Request, res: Response, next: NextFunction): Promise<void>;
    abstract turnInBook(req: Request, res: Response, next: NextFunction): Promise<void>;
    abstract getAllBooks(req: Request, res: Response, next: NextFunction): Promise<void>;
    abstract getBook(req: Request, res: Response, next: NextFunction): Promise<void>;
}

