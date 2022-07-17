"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_service_1 = __importDefault(require("./db_service"));
const db_setup_1 = require("./db_setup");
class DatabaseServiceImpl extends db_service_1.default {
    async create(param) {
        const { isUser } = param;
        if (isUser) {
            // testing 
            console.log("db call got here");
            const { email, password, name } = param.user;
            const existingUser = await db_setup_1.UserModel.findOne({ email: email });
            if (existingUser) {
                // testing
                console.log("user already existing");
                throw new Error("user already existing");
                //process.exit();
            }
            else {
                const user = new db_setup_1.UserModel({ email: email, password: password, name: name });
                await user.save();
                return;
            }
        }
        else {
            const { name, hash, isRented, startDate, endDate, rentedBy } = param.rent;
            // testing ........
            console.log(param.rent);
            const existingBook = await db_setup_1.BookModel.findOne({ name: name });
            // testing......
            console.log(existingBook);
            if (existingBook === null || existingBook === undefined) {
                // testing ..........
                const newBook = new db_setup_1.BookModel({ name: name, hash: hash, isRented: isRented, startDate: startDate, endDate: endDate, rentedBy: rentedBy });
                newBook.save();
                return;
            }
            else {
                console.log("call entered existingBook !== null");
                return;
            }
        }
    }
    async update(param) {
        const { isUser } = param;
        if (isUser) {
            const { email, password, name } = param.user;
            await db_setup_1.UserModel.updateOne({ email: email }, { password: password, name: name });
        }
        else {
            const { hash, name, isRented, rentedBy, startDate, endDate } = param.rent;
            await db_setup_1.BookModel.updateOne({ name: name }, { isRented: isRented, rentedBy: rentedBy, startDate: startDate, endDate: endDate });
        }
    }
    async delete(param) {
        const { isUser } = param;
        if (isUser) {
            const { email, password, name } = param.user;
            await db_setup_1.UserModel.deleteOne({ email: email }, { password: password, name: name });
        }
        else {
            const { hash, isRented, rentedBy, startDate, endDate } = param.rent;
            await db_setup_1.BookModel.deleteOne({ hash: hash }, { isRented: isRented, rentedBy: rentedBy, startDate: startDate, endDate: endDate });
        }
    }
    async get(param) {
        const { isUser } = param;
        if (isUser) {
            const { email } = param.user;
            const existingUserDoc = await db_setup_1.UserModel.findOne({ email: email }).lean();
            if (existingUserDoc === undefined || existingUserDoc == null) {
                return null;
            }
            const _user = {
                id: existingUserDoc._id,
                email: existingUserDoc.email,
                password: existingUserDoc.password
            };
            const castResults = {
                user: _user,
                rent: null
            };
            return castResults;
        }
        else {
            const { name } = param.rent;
            const existingBookDoc = await db_setup_1.BookModel.findOne({ hash: name }).lean();
            if (existingBookDoc === undefined || existingBookDoc === null) {
                return null;
            }
            const _rent = {
                id: existingBookDoc._id,
                hash: existingBookDoc.hash,
                name: existingBookDoc.name,
                startDate: existingBookDoc.startDate,
                endDate: existingBookDoc.endDate,
                rentedBy: existingBookDoc.rentedBy,
                isRented: existingBookDoc.isRented,
            };
            const castResults = {
                user: null,
                rent: _rent
            };
            return castResults;
        }
    }
    async getAll(param) {
        /// functionality not implemented yet
        try {
            const { isUser } = param;
            if (isUser) {
                //
            }
            return [];
        }
        catch (error) {
            return [];
        }
    }
}
exports.default = DatabaseServiceImpl;
