import { Request, Response, NextFunction } from "express";
import RentRepository from "./rent_repo";

export default class RentalRepositoryImpl extends RentRepository {
    async rentBook(req: Request, res: Response, next: NextFunction): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async turnInBook(req: Request, res: Response, next: NextFunction): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async getAllBooks(req: Request, res: Response, next: NextFunction): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async getBook(req: Request, res: Response, next: NextFunction): Promise<void> {
        throw new Error("Method not implemented.");
    }
}