"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_service_handler_1 = __importDefault(require("../handlers/auth_service_handler"));
const rental_service_handler_1 = __importDefault(require("../handlers/rental_service_handler"));
const auth_service_impl_1 = __importDefault(require("../services/auth_service/auth_service_impl"));
const rental_service_impl_1 = __importDefault(require("../services/rental_service/rental_service_impl"));
const get_all_users_1 = __importDefault(require("../usecases/auth_usecases/get_all_users"));
const get_user_1 = __importDefault(require("../usecases/auth_usecases/get_user"));
const login_1 = __importDefault(require("../usecases/auth_usecases/login"));
const signup_1 = __importDefault(require("../usecases/auth_usecases/signup"));
const get_all_books_1 = __importDefault(require("../usecases/rental_usecases/get_all_books"));
const rent_book_1 = __importDefault(require("../usecases/rental_usecases/rent_book"));
const turn_in_book_1 = __importDefault(require("../usecases/rental_usecases/turn_in_book"));
const prisma_db_1 = require("../db/postgresql/prisma_db");
const client_1 = require("@prisma/client");
const get_book_1 = __importDefault(require("../usecases/rental_usecases/get_book"));
class Injector {
}
exports.default = Injector;
/// usecases
Injector.login = new login_1.default(new auth_service_impl_1.default(new auth_service_handler_1.default(new prisma_db_1.UserDatabasePrisma(new client_1.PrismaClient()))));
Injector.signup = new signup_1.default(new auth_service_impl_1.default(new auth_service_handler_1.default(new prisma_db_1.UserDatabasePrisma(new client_1.PrismaClient()))));
Injector.getUser = new get_user_1.default(new auth_service_impl_1.default(new auth_service_handler_1.default(new prisma_db_1.UserDatabasePrisma(new client_1.PrismaClient()))));
Injector.getAllUsers = new get_all_users_1.default(new auth_service_impl_1.default(new auth_service_handler_1.default(new prisma_db_1.UserDatabasePrisma(new client_1.PrismaClient()))));
Injector.getBook = new get_book_1.default(new rental_service_impl_1.default(new rental_service_handler_1.default(new prisma_db_1.BookDatabase(new client_1.PrismaClient()))));
Injector.getAllBooks = new get_all_books_1.default(new rental_service_impl_1.default(new rental_service_handler_1.default(new prisma_db_1.BookDatabase(new client_1.PrismaClient()))));
Injector.rentBook = new rent_book_1.default(new rental_service_impl_1.default(new rental_service_handler_1.default(new prisma_db_1.BookDatabase(new client_1.PrismaClient()))));
Injector.turnInBook = new turn_in_book_1.default(new rental_service_impl_1.default(new rental_service_handler_1.default(new prisma_db_1.BookDatabase(new client_1.PrismaClient()))));
Injector.userDatabase = new prisma_db_1.UserDatabasePrisma(new client_1.PrismaClient());
Injector.bookDatabase = new prisma_db_1.BookDatabase(new client_1.PrismaClient());
