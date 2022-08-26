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
            await this.prisma.user.findUnique({
                where: {
                    email: email,
                },
            });
        }
        catch (error) { }
    }
    async retrieve(param) {
        try {
        }
        catch (error) { }
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
    retrieveOne(param) {
        throw new Error("Method not implemented.");
    }
    retrieve(param) {
        throw new Error("Method not implemented.");
    }
    async create(param) { }
    async update(param) { }
    async delete(param) { }
}
exports.BookDatabase = BookDatabase;
