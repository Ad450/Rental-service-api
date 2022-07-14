import { NextFunction, Request, Response } from "express";
import Injector from "../di/injector";
import EndpointsInterface, { routerMethods } from "./endpoints_interface";

// Rentals
const getAllBooks: string = "/getAllBooks";
const getBook: string = "/getBook:id";
const rentBook: string = "/rentBook";
const turnInBook: string = "/turnInBook";

// Auth
const getAllUsers: string = "/getAllUsers";
const getUser: string = "/getUser:id";
const signup: string = "/signup";
const login: string = "/login";




export const routers: Array<EndpointsInterface> = [
    /// Authentication
    {
        route: signup,
        method: routerMethods.POST,
        handlers: (req: Request, res: Response, next: NextFunction) => Injector.signup.call({ req, res, next })
    },
    {
        route: login,
        method: routerMethods.POST,
        handlers: (req: Request, res: Response, next: NextFunction) => Injector.login.call({ req, res, next })
    },
    {
        route: getUser,
        method: routerMethods.GET,
        handlers: (req: Request, res: Response, next: NextFunction) => Injector.getUser.call({ req, res, next })
    },
    {
        route: getAllUsers,
        method: routerMethods.GET,
        handlers: (req: Request, res: Response, next: NextFunction) => Injector.getAllUsers.call({ req, res, next })
    },

    /// Rental Service
    {
        route: rentBook,
        method: routerMethods.POST,
        handlers: (req: Request, res: Response, next: NextFunction) => Injector.rentBook.call({ req, res, next })
    },
    {
        route: turnInBook,
        method: routerMethods.POST,
        handlers: (req: Request, res: Response, next: NextFunction) => Injector.turnInBook.call({ req, res, next })
    },
    {
        route: getBook,
        method: routerMethods.GET,
        handlers: (req: Request, res: Response, next: NextFunction) => Injector.getBook.call({ req, res, next })
    },
    {
        route: getAllBooks,
        method: routerMethods.GET,
        handlers: (req: Request, res: Response, next: NextFunction) => Injector.getAllBooks.call({ req, res, next })
    }

]