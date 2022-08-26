"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectPrisma = exports.prisma = void 0;
const client_1 = require("@prisma/client");
exports.prisma = new client_1.PrismaClient();
async function connectPrisma() {
    try {
        await exports.prisma.$connect();
    }
    catch (error) {
        await exports.prisma.$disconnect();
        console.log(error);
    }
}
exports.connectPrisma = connectPrisma;
