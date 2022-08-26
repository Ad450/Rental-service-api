"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookDatabase = exports.UserDatabase = void 0;
class Prisma {
}
class UserDatabase {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async retrieveOne(param) {
        const { name, email, password } = param;
        try {
            const user = await this.prisma.user.findUnique({
                where: {
                    email: email,
                },
            });
            return user;
        }
        catch (error) {
            throw new Error("database error");
        }
    }
    async retrieve(param) {
        try {
            // returning null for skip return error
            return null;
        }
        catch (error) {
            throw new Error("database error");
        }
    }
    async create(param) {
        const { name, email, password } = param;
        try {
            await this.prisma.user.create({
                data: {
                    name: name,
                    password: password,
                    email: email,
                },
            });
        }
        catch (error) {
            // TODO: handle errors properly
            console.log(error);
        }
    }
    async update(param) {
        const { name, email, password } = param;
        try {
            await this.prisma.user.update({
                where: {
                    email: email,
                },
                data: {
                    name: name,
                    email: email,
                    password: password,
                },
            });
        }
        catch (error) { }
    }
    async delete(param) { }
}
exports.UserDatabase = UserDatabase;
class BookDatabase {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async retrieveOne(param) {
        const { name, hash, startDate, endDate, rented, rentedBy } = param;
        try {
            const book = await this.prisma.book.findUnique({
                where: {
                    hash: hash,
                },
            });
            return book;
        }
        catch (error) {
            throw new Error("database error");
        }
    }
    async retrieve(param) {
        const { name, hash, startDate, endDate, rented, rentedBy } = param;
        try {
            const book = await this.prisma.book.findMany({
                where: {
                    name: name,
                },
            });
            return book;
        }
        catch (error) {
            throw new Error("database error");
        }
    }
    async create(param) {
        const { name, hash, startDate, endDate, rented, rentedBy } = param;
        try {
            await this.prisma.book.create({
                data: {
                    name: name,
                    hash: hash,
                    startDate: startDate,
                    endDate: endDate,
                    rented: rented,
                    rentedBy: rentedBy,
                },
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    async update(param) {
        const { name, hash, startDate, endDate, rented, rentedBy } = param;
        try {
            await this.prisma.book.update({
                where: {
                    hash: hash,
                },
                data: {
                    name: name,
                    hash: hash,
                    startDate: startDate,
                    endDate: endDate,
                    rented: rented,
                    rentedBy: rentedBy,
                },
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    async delete(param) { }
}
exports.BookDatabase = BookDatabase;
