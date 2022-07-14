import { NextFunction, Request, Response } from "express";

export default interface EndpointsInterface {
    route: string,
    method: routerMethods,
    handlers: (req: Request, res: Response, next: NextFunction) => {}
}


export enum routerMethods {
    POST,
    GET,
    PATCH,
}