import { NextFunction, Request, Response } from "express";

export default interface EndpointsInterface {
    route: string,
    method: METHODS,
    handlers: (req: Request, res: Response, next: NextFunction) => {}
}


enum METHODS {
    POST,
    GET,
    PATCH,
}