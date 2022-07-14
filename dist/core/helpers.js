"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashData = exports.comparePasswords = exports.encryptData = exports.generateAccessToken = exports.validateInput = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv = __importStar(require("dotenv"));
const bcrypt = __importStar(require("bcrypt"));
const assert_1 = __importDefault(require("assert"));
dotenv.config();
const validateInput = async (req, res, isAuth, isRental) => {
    // check for nullability of input fields
    if (isAuth.isSignup || isAuth.isLogin) {
        // if (!(req.body as Map<any, any>).has("email") && !(req.body as Map<any, any>).has("password")) {
        //     res.status(401).json({
        //         // TODO: to handle responses properly
        //         "message": "invalid data"
        //     })
        // }
        if (!("email" in req.body) && !("password" in req.body)) {
            res.status(401).json({
                // TODO: to handle responses properly
                "message": "invalid data"
            }).end();
        }
        if (req.body.email === null || undefined && req.body.password === null) {
            res.status(401).json({
                // TODO: to handle responses properly
                "message": "invalid data"
            }).end();
        }
        if (!refineInput(req, res))
            res.status(404).json({ "message": "invalid credentials" }).end();
        return true;
    }
    if (isRental.isRental) {
        try {
            (0, assert_1.default)(req.body.has("name"));
            (0, assert_1.default)(req.body.has("startDate"));
            (0, assert_1.default)(req.body.has("endDate"));
            (0, assert_1.default)(req.body.has("password"));
            return true;
        }
        catch (error) {
            res.status(404).json({
                "message": "invalid credentials"
            }).end();
        }
    }
    if (isAuth.isLogin || isRental.isRental) {
        // validate jwt 
        try {
            const authorizationHeader = req.headers["authorization"];
            if (authorizationHeader === undefined || authorizationHeader === null) {
                res.status(401).json({
                    "message": "authorization failed"
                }).end();
            }
            // note: " " in split in the split method is the separator object. 
            const token = authorizationHeader.split(" ")[1];
            jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET || "");
            return true;
        }
        catch (error) {
            res.status(401).json({
                "message": "authorization failed"
            }).end();
        }
    }
    return false;
};
exports.validateInput = validateInput;
const generateAccessToken = async (req) => {
    try {
        const accessToken = jsonwebtoken_1.default.sign(req.body, process.env.ACCESS_TOKEN_SECRET || "");
        return accessToken;
    }
    catch (error) {
        // will do a proper error handling
        throw new Error("Access token generation failed");
    }
};
exports.generateAccessToken = generateAccessToken;
const encryptData = async (req) => {
    // try {
    //     //const salt = await bcrypt.genSalt(3);
    //     const hash = await bcrypt.hash(req.body.password, 3);
    //     return hash;
    // } catch (error) {
    //     throw new Error("encryption failed");
    //}
    // testing with random string
    return "0xer3232453";
};
exports.encryptData = encryptData;
const comparePasswords = async (input, existingPassword) => {
    try {
        const results = await bcrypt.compare(input, existingPassword);
        return results;
    }
    catch (error) {
        throw new Error("password comparison failed");
    }
};
exports.comparePasswords = comparePasswords;
const hashData = async (input) => {
    try {
        const salt = await bcrypt.genSalt(3);
        const results = await bcrypt.hash(input, salt);
        return results;
    }
    catch (error) {
        throw new Error("password comparison failed");
    }
};
exports.hashData = hashData;
const refineInput = (req, res) => {
    /// Name with at least 4 digits
    /// Name without special characters ^ < > ( ) \[ \] \\\ / . , ; : \s @ ’
    /// E-mail must have @
    /// Domain name with at least 4 digits
    /// Domain name without special characters ^ < > ( ) \[ \] \\\ / . , ; : \s @ ’
    /// Domain extension only .com or .net
    const emailRegex = /([A-Z]|[a-z]|[^<>()\[\]\\\/.,;:\s@"]){4,}\@([A-Z]|[a-z]|[^<>()\[\]\\\/.,;:\s@"]){4,}\.(com|net)/;
    if (!emailRegex.test(req.body.email))
        return false;
    /// Password at least 6 digits.
    /// At least one lowercase
    /// At least one uppercase
    /// At least one special character from @ # $ % ^ & *
    const passwordRegex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/;
    if (!passwordRegex.test(req.body.password))
        return false;
    return true;
};
