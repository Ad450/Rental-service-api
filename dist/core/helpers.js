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
exports.typeGuard = exports.hashData = exports.comparePasswords = exports.encryptData = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv = __importStar(require("dotenv"));
const bcrypt_1 = __importDefault(require("bcrypt"));
dotenv.config();
const generateAccessToken = async (req) => {
    try {
        const accessToken = jsonwebtoken_1.default.sign(req.body, process.env.ACCESS_TOKEN_SECRET || "jwt");
        return accessToken;
    }
    catch (error) {
        //TODO will do a proper error handling
        throw new Error("Access token generation failed");
    }
};
exports.generateAccessToken = generateAccessToken;
const encryptData = async (req) => {
    // try {
    //     const salt = await bcrypt.genSalt(3);
    //     const hash = await bcrypt.hash(req.body.password.toString(), salt);
    //     return hash;
    // } catch (error) {
    //     throw new Error("encryption failed");
    //}
    //testing with random string
    return "0xer3232453";
};
exports.encryptData = encryptData;
const comparePasswords = async (input, existingPassword) => {
    try {
        const results = await bcrypt_1.default.compare(input, existingPassword);
        return results;
    }
    catch (error) {
        console.log(error);
        return false;
    }
};
exports.comparePasswords = comparePasswords;
const hashData = async (input, nonce) => {
    try {
        const hash = await bcrypt_1.default.hash(input, 4);
        return hash;
    }
    catch (error) {
        throw new Error("password comparison failed");
    }
};
exports.hashData = hashData;
function typeGuard({ param, typeArray }) {
    return typeArray.indexOf(param) === -1;
}
exports.typeGuard = typeGuard;
