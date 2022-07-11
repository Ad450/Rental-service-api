import { Request, Response, NextFunction } from "express";
import AuthenticationRepository from "./auth_repo";

export default class AuthenticationRepositoryImpl extends AuthenticationRepository {
    async signup(req: Request, res: Response, next: NextFunction): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async getAllUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async getUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        throw new Error("Method not implemented.");
    }
}