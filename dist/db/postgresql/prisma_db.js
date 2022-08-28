"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookDatabase = exports.UserDatabasePrisma = void 0;
class UserDatabasePrisma {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async retrieveOne(id) {
        try {
            const user = await this.prisma.user.findUnique({
                where: {
                    id: id,
                },
            });
            return user;
        }
        catch (error) {
            throw new Error("database error");
        }
    }
    async retrieve() {
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
exports.UserDatabasePrisma = UserDatabasePrisma;
class BookDatabase {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async retrieveOne(id) {
        try {
            const book = await this.prisma.book.findUnique({
                where: {
                    id: id,
                },
            });
            return book;
        }
        catch (error) {
            console.log(error);
            throw new Error("database error");
        }
    }
    async retrieve() {
        try {
            const book = await this.prisma.book.findMany({
            // where: {
            //   name: identifier,
            // },
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
                    name: name,
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
