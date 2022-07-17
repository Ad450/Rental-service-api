"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routers = void 0;
const injector_1 = __importDefault(require("../di/injector"));
const validators_1 = require("../middlewares/validators");
const endpoints_interface_1 = require("../interfaces/endpoints_interface");
// Rentals
const getAllBooks = "/getAllBooks";
const getBook = "/getBook:id";
const rentBook = "/rentBook";
const turnInBook = "/turnInBook";
// Auth
const getAllUsers = "/getAllUsers";
const getUser = "/getUser:id";
const signup = "/signup";
const login = "/login";
exports.routers = [
    /// Authentication
    {
        route: signup,
        method: endpoints_interface_1.routerMethods.POST,
        handlers: (req, res, next) => injector_1.default.signup.call({ req, res, next }),
        middlewares: [validators_1.refineAuthInput, validators_1.validateAuthInput]
    },
    {
        route: login,
        method: endpoints_interface_1.routerMethods.POST,
        handlers: (req, res, next) => injector_1.default.login.call({ req, res, next }),
        middlewares: [validators_1.refineAuthInput, validators_1.validateToken, validators_1.validateAuthInput, validators_1.validateLoginPassword]
    },
    {
        route: getUser,
        method: endpoints_interface_1.routerMethods.GET,
        handlers: (req, res, next) => injector_1.default.getUser.call({ req, res, next }),
        middlewares: [validators_1.validateToken, validators_1.validateAuthInput]
    },
    {
        route: getAllUsers,
        method: endpoints_interface_1.routerMethods.GET,
        handlers: (req, res, next) => injector_1.default.getAllUsers.call({ req, res, next }),
        middlewares: [validators_1.validateToken, validators_1.validateAuthInput]
    },
    /// Rental Service
    {
        route: rentBook,
        method: endpoints_interface_1.routerMethods.POST,
        handlers: (req, res, next) => injector_1.default.rentBook.call({ req, res, next }),
        middlewares: [validators_1.validateToken, validators_1.validateRentalInput]
    },
    {
        route: turnInBook,
        method: endpoints_interface_1.routerMethods.POST,
        handlers: (req, res, next) => injector_1.default.turnInBook.call({ req, res, next }),
        middlewares: [validators_1.validateToken, validators_1.validateRentalInput]
    },
    {
        route: getBook,
        method: endpoints_interface_1.routerMethods.GET,
        handlers: (req, res, next) => injector_1.default.getBook.call({ req, res, next }),
        middlewares: [validators_1.validateToken, validators_1.validateRentalInput]
    },
    {
        route: getAllBooks,
        method: endpoints_interface_1.routerMethods.GET,
        handlers: (req, res, next) => injector_1.default.getAllBooks.call({ req, res, next }),
        middlewares: [validators_1.validateToken, validators_1.validateRentalInput]
    }
];
