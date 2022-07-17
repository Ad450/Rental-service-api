"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLoginPassword = exports.refineAuthInput = exports.validateAuthInput = exports.validateRentalInput = exports.validateToken = void 0;
const assert_1 = __importDefault(require("assert"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const helpers_1 = require("../core/helpers");
const injector_1 = __importDefault(require("../di/injector"));
const response_handler_1 = __importDefault(require("../response_handlers/response_handler"));
const validateToken = async (req, res, next) => {
    try {
        const headers = req.headers["authorization"];
        if (headers === undefined) {
            res.status(401).json(response_handler_1.default.responseJson(response_handler_1.default.responses.authorizationFailed)).end();
        }
        /// the authorization header has two strings Bearer and the token 
        /// [1] returns the token
        const token = headers.split(" ")[1];
        jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET || "");
        next();
    }
    catch (error) {
        res.status(401).json(response_handler_1.default.responseJson(response_handler_1.default.responses.authorizationFailed)).end();
    }
};
exports.validateToken = validateToken;
const validateRentalInput = async (req, res, next) => {
    try {
        // assert((req.body as Map<any, any>).has("name"));
        // assert((req.body as Map<any, any>).has("startDate"));
        // assert((req.body as Map<any, any>).has("endDate"));
        // assert((req.body as Map<any, any>).has("password"));
        (0, assert_1.default)(req.body.name !== undefined || null);
        (0, assert_1.default)(req.body.startDate !== undefined || null);
        (0, assert_1.default)(req.body.endDate !== undefined || null);
        (0, assert_1.default)(req.body.password !== undefined || null);
        next();
    }
    catch (error) {
        res.status(401).json(response_handler_1.default.responseJson(response_handler_1.default.responses.invalidInputData)).end();
    }
};
exports.validateRentalInput = validateRentalInput;
const validateAuthInput = async (req, res, next) => {
    try {
        // assert((req.body as Map<any, any>).has("name"));
        // assert((req.body as Map<any, any>).has("email"));
        // assert((req.body as Map<any, any>).has("password"));
        (0, assert_1.default)(req.body.name !== undefined || null);
        (0, assert_1.default)(req.body.email !== undefined || null);
        (0, assert_1.default)(req.body.password !== undefined || null);
        next();
    }
    catch (error) {
        res.status(401).json(response_handler_1.default.responseJson(response_handler_1.default.responses.invalidAuthInput)).end();
    }
};
exports.validateAuthInput = validateAuthInput;
const refineAuthInput = async (req, res, next) => {
    /// Name with at least 4 digits
    /// Name without special characters ^ < > ( ) \[ \] \\\ / . , ; : \s @ ’
    /// E-mail must have @
    /// Domain name with at least 4 digits
    /// Domain name without special characters ^ < > ( ) \[ \] \\\ / . , ; : \s @ ’
    /// Domain extension only .com or .net
    const emailRegex = /([A-Z]|[a-z]|[^<>()\[\]\\\/.,;:\s@"]){4,}\@([A-Z]|[a-z]|[^<>()\[\]\\\/.,;:\s@"]){4,}\.(com|net)/;
    /// Password at least 6 digits.
    /// At least one lowercase
    /// At least one uppercase
    /// At least one special character from @ # $ % ^ & *
    const passwordRegex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/;
    if (!emailRegex.test(req.body.email) || !passwordRegex.test(req.body.password)) {
        if (!emailRegex.test(req.body.email) && !passwordRegex.test(req.body.password)) {
            res.status(401).json(response_handler_1.default.responseJson(response_handler_1.default.responses.invalidCredentials)).end();
        }
        else if (!passwordRegex.test(req.body.password)) {
            res.status(401).json(response_handler_1.default.responseJson(response_handler_1.default.responses.invalidPassword)).end();
        }
        else if (!emailRegex.test(req.body.email)) {
            res.status(401).json(response_handler_1.default.responseJson(response_handler_1.default.responses.invalidEmail)).end();
        }
        else {
            res.status(401).json(response_handler_1.default.responseJson(response_handler_1.default.responses.invalidCredentials)).end();
        }
    }
    else {
        next();
    }
};
exports.refineAuthInput = refineAuthInput;
const validateLoginPassword = async (req, res, next) => {
    const requestPassword = req.body.password;
    /// Only email is used by db to retrieve user
    /// Other params exist to prevent missing params compilation error
    const returnType = await injector_1.default.db.get({ isUser: true, user: { email: req.body.email, password: requestPassword, name: req.body.name }, rent: null });
    if (returnType === null || returnType === undefined) {
        res.status(404).json(response_handler_1.default.responseJson(response_handler_1.default.responses.userNotFound)).end();
    }
    else {
        try {
            const { user } = returnType;
            const oldPassword = user.password;
            const newPassword = req.body.password;
            const isMatch = await (0, helpers_1.comparePasswords)(newPassword, oldPassword);
            if (isMatch === false)
                res.status(404).json(response_handler_1.default.responseJson(response_handler_1.default.responses.invalidLogin)).end();
            next();
        }
        catch (error) {
            res.status(500).json(response_handler_1.default.responseJson(response_handler_1.default.responses.serverError)).end();
        }
    }
};
exports.validateLoginPassword = validateLoginPassword;
