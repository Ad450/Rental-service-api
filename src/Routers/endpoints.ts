import { NextFunction, Request, Response } from "express";
import Injector from "../di/injector";
import { validateRequestParams } from "../middlewares/validators";
import {
  refineAuthInput,
  validateAuthInput,
  validateLoginPassword,
  validateRentalInput,
  validateToken,
} from "../middlewares/validators";
import EndpointsInterface, {
  routerMethods,
} from "../interfaces/endpoints_interface";

// Rentals
const getAllBooks: string = "/getAllBooks";
const getBook: string = "/getBook/:name";
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
    handlers: (req: Request, res: Response, next: NextFunction) =>
      Injector.signup.call({ req, res, next }),
    middlewares: [refineAuthInput, validateAuthInput],
  },
  {
    route: login,
    method: routerMethods.POST,
    handlers: (req: Request, res: Response, next: NextFunction) =>
      Injector.login.call({ req, res, next }),
    middlewares: [
      refineAuthInput,
      validateToken,
      validateAuthInput,
      validateLoginPassword,
    ],
  },
  {
    route: getUser,
    method: routerMethods.GET,
    handlers: (req: Request, res: Response, next: NextFunction) =>
      Injector.getUser.call({ req, res, next }),
    middlewares: [validateToken, validateRequestParams],
  },
  {
    route: getAllUsers,
    method: routerMethods.GET,
    handlers: (req: Request, res: Response, next: NextFunction) =>
      Injector.getAllUsers.call({ req, res, next }),
    middlewares: [validateToken, validateRequestParams],
  },

  /// Rental Service
  {
    route: rentBook,
    method: routerMethods.POST,
    handlers: (req: Request, res: Response, next: NextFunction) =>
      Injector.rentBook.call({ req, res, next }),
    middlewares: [validateToken, validateRentalInput],
  },
  {
    route: turnInBook,
    method: routerMethods.POST,
    handlers: (req: Request, res: Response, next: NextFunction) =>
      Injector.turnInBook.call({ req, res, next }),
    middlewares: [validateToken, validateRentalInput],
  },
  {
    route: getBook,
    method: routerMethods.GET,
    handlers: (req: Request, res: Response, next: NextFunction) =>
      Injector.getBook.call({ req, res, next }),
    middlewares: [validateToken, validateRequestParams],
  },
  {
    route: getAllBooks,
    method: routerMethods.GET,
    handlers: (req: Request, res: Response, next: NextFunction) =>
      Injector.getAllBooks.call({ req, res, next }),
    middlewares: [validateToken, validateRequestParams],
  },
];
