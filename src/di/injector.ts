import DatabaseService from "../db/db_service";
import DatabaseServiceImpl from "../db/db_service_impl";
import AuthServiceHandler from "../handlers/auth_service_handler";
import RentalServiceHandler from "../handlers/rental_service_handler";
import { DatabaseParam } from "../interfaces/database_service_param";
import AuthServiceImpl from "../services/auth_service/auth_service_impl";
import RentalServiceImpl from "../services/rental_service/rental_service_impl";
import GetAllUsers from "../usecases/auth_usecases/get_all_users";
import GetUser from "../usecases/auth_usecases/get_user";
import Login from "../usecases/auth_usecases/login";
import Signup from "../usecases/auth_usecases/signup";
import GetAllBooks from "../usecases/rental_usecases/get_all_books";
import GetBook from "../usecases/rental_usecases/get_all_books";
import RentBook from "../usecases/rental_usecases/rent_book";
import TurnInBook from "../usecases/rental_usecases/turn_in_book";
import { UserDatabase, BookDatabase } from "../db/prisma_db";
import { PrismaClient } from "@prisma/client";

export default abstract class Injector {
  /// usecases

  static login = new Login(
    new AuthServiceImpl(
      new AuthServiceHandler(new UserDatabase(new PrismaClient()))
    )
  );
  static signup = new Signup(
    new AuthServiceImpl(
      new AuthServiceHandler(new UserDatabase(new PrismaClient()))
    )
  );
  static getUser = new GetUser(
    new AuthServiceImpl(
      new AuthServiceHandler(new UserDatabase(new PrismaClient()))
    )
  );
  static getAllUsers = new GetAllUsers(
    new AuthServiceImpl(
      new AuthServiceHandler(new UserDatabase(new PrismaClient()))
    )
  );
  static getBook = new GetBook(
    new RentalServiceImpl(
      new RentalServiceHandler(new BookDatabase(new PrismaClient()))
    )
  );
  static getAllBooks = new GetAllBooks(
    new RentalServiceImpl(
      new RentalServiceHandler(new BookDatabase(new PrismaClient()))
    )
  );
  static rentBook = new RentBook(
    new RentalServiceImpl(
      new RentalServiceHandler(new BookDatabase(new PrismaClient()))
    )
  );
  static turnInBook = new TurnInBook(
    new RentalServiceImpl(
      new RentalServiceHandler(new BookDatabase(new PrismaClient()))
    )
  );
  // static userDatabase = new UserDatabase(new PrismaClient());
  // static bookDatabase = new BookDatabase(new PrismaClient());
  // static db = new DatabaseServiceImpl();
}
