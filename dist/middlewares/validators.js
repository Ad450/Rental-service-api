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
const validateToken = async (req, res, next) => {
    try {
        const headers = req.headers["authorization"];
        if (!headers) {
            res.status(401).json({
                "message": "authorizatoin failed"
            }).end();
        }
        /// the authorization header has two strings Bearer and the token 
        /// [1] returns the token
        const token = headers.split(" ")[1];
        jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET || "");
        next();
    }
    catch (error) {
        res.status(401).json({
            "message": "authorizatoin failed"
        }).end();
    }
};
exports.validateToken = validateToken;
const validateRentalInput = async (req, res, next) => {
    try {
        (0, assert_1.default)(req.body.has("name"));
        (0, assert_1.default)(req.body.has("startDate"));
        (0, assert_1.default)(req.body.has("endDate"));
        (0, assert_1.default)(req.body.has("password"));
        (0, assert_1.default)(req.body.name !== undefined || null);
        (0, assert_1.default)(req.body.startDate !== undefined || null);
        (0, assert_1.default)(req.body.endDate !== undefined || null);
        (0, assert_1.default)(req.body.password !== undefined || null);
        next();
    }
    catch (error) {
        res.status(401).json({
            "message": "invalid input data"
        }).end();
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
        res.status(401).json({
            "message": "invalid auth input data"
        }).end();
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
    if (!emailRegex.test(req.body.email))
        res.status(401).json({ "message": "invalid email credentials" }).end();
    /// Password at least 6 digits.
    /// At least one lowercase
    /// At least one uppercase
    /// At least one special character from @ # $ % ^ & *
    const passwordRegex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/;
    if (!passwordRegex.test(req.body.password))
        res.status(401).json({ "message": "invalid password credentials" }).end();
    next();
};
exports.refineAuthInput = refineAuthInput;
const validateLoginPassword = async (req, res, next) => {
    const requestPassword = req.body.password;
    const newlyEncryptedPassword = await (0, helpers_1.hashData)(requestPassword);
    const returnType = await injector_1.default.db.get({ isUser: true, user: { email: req.body.email, password: newlyEncryptedPassword, name: req.body.name }, rent: null });
    if (returnType === null || returnType === undefined) {
        res.status(404).json({
            "message": "user not found"
        }).end();
    }
    try {
        const { user } = returnType;
        const oldEncryptedPassword = user.password;
        if (!await (0, helpers_1.comparePasswords)(newlyEncryptedPassword, oldEncryptedPassword))
            res.status(404).json({
                "message": "invalid login credentials"
            }).end();
        next();
    }
    catch (error) {
        res.status(500).json({
            "message": "server error"
        }).end();
    }
};
exports.validateLoginPassword = validateLoginPassword;
