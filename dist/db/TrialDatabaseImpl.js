"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = exports.User = void 0;
const db_setup_1 = require("./db_setup");
const helpers_1 = require("../core/helpers");
//const UserModelType = typeof UserModel;
class User {
}
exports.User = User;
class Book {
}
exports.Book = Book;
class TrialDatabaseImpl {
    async create(param) {
        const types = {
            param: typeof param,
            typeArray: [User, Book],
        };
        if (!(0, helpers_1.typeGuard)(types)) {
            // testing
            console.log("got here");
            const { email, password, name } = param;
            // testing.........
            console.log(email);
            console.log(name);
            console.log(password);
            const existingUser = await db_setup_1.UserModel.findOne({ email: email });
            if (existingUser)
                throw new Error("user already exists");
            else {
                const user = new db_setup_1.UserModel({
                    email: email,
                    password: password,
                    name: name,
                });
                await user.save();
                return;
            }
        }
        else {
            // testing
            console.log("got intno books");
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
