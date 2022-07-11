import { Request, Response, NextFunction } from "express";

export default abstract class AuthenticationRepository {
    abstract signup(req: Request, res: Response, next: NextFunction): Promise<void>;
    abstract login(req: Request, res: Response, next: NextFunction): Promise<void>;
    abstract getAllUsers(req: Request, res: Response, next: NextFunction): Promise<void>;
    abstract getUser(req: Request, res: Response, next: NextFunction): Promise<void>;
}