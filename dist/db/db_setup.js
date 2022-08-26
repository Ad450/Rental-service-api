"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.BookModel = exports.connectMongoose = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
});
const bookSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    hash: {
        type: String,
        required: true,
    },
    startDate: {
        type: String,
        required: false,
    },
    endDate: {
        type: String,
        required: false,
    },
    isRented: {
        type: Boolean,
        required: true,
    },
    rentedBy: {
        type: String,
        required: true,
    },
});
const connectMongoose = async () => {
    try {
        await mongoose_1.default.connect(process.env.DATABASE_URL || "");
        console.log("mongoose connected");
    }
    catch (error) {
        console.log(error);
    }
};
exports.connectMongoose = connectMongoose;
exports.BookModel = mongoose_1.default.model("Book", bookSchema);
exports.UserModel = mongoose_1.default.model("User", userSchema);
