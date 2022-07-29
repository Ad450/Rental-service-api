"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = exports.User = void 0;
const db_setup_1 = require("./db_setup");
const UserModelType = typeof db_setup_1.UserModel;
class User {
}
exports.User = User;
class Book {
}
exports.Book = Book;
class TrialDatabaseImpl {
    async create(param) {
        if (param instanceof User) {
            const { email, password, name } = param;
            const existingUser = await db_setup_1.UserModel.findOne({ email: email });
            if (existingUser)
                throw new Error("user already exists");
            const user = new db_setup_1.UserModel({
                email: email,
                password: password,
                name: name,
            });
            await user.save();
            return;
        }
        else {
            const { name, hash, isRented, startDate, endDate, rentedBy } = param;
            const existingBook = await db_setup_1.BookModel.findOne({ name: name });
            if (existingBook)
                throw new Error("Book already exists");
            const book = new db_setup_1.BookModel({
                name: name,
                hash: hash,
                isRented: isRented,
                startDate: startDate,
                endDate: endDate,
                rentedBy: rentedBy,
            });
            await book.save();
            return;
        }
    }
}
exports.default = TrialDatabaseImpl;
