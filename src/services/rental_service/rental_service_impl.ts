import RentalServiceHandler from "../../handlers/rental_service_handler";
import { BookFromDb } from "../../interfaces/database_service_param";
import RentalServiceParam from "../../interfaces/rental_service_param";
import RentalService from "./rental_service";
import { BookType } from "../../db/prisma_db";

export default class RentalServiceImpl
  implements RentalService<RentalServiceParam>
{
  rentalServiceHandler: RentalServiceHandler;

  constructor(rentalServiceHandler: RentalServiceHandler) {
    this.rentalServiceHandler = rentalServiceHandler;
  }
  async rentBook(param: RentalServiceParam): Promise<void> {
    const { req, res, next } = param;
    try {
      this.rentalServiceHandler.rentBook(req, res, next);
    } catch (error) {
      // TODO: use logger
      console.log(error);
    }
  }
  async turnInBook(param: RentalServiceParam): Promise<void> {
    const { req, res, next } = param;
    try {
      this.rentalServiceHandler.turnInBook(req, res);
    } catch (error) {
      // TODO: use logger
      console.log(error);
    }
  }
  async getBook(param: RentalServiceParam): Promise<void> {
    const { req, res, next } = param;
    try {
      await this.rentalServiceHandler.getBook(req, res);
    } catch (error) {
      // TODO: use logger
      console.log(error);
    }
  }
  async getAllBook(param: RentalServiceParam): Promise<void> {
    const { req, res, next } = param;
    try {
      await this.rentalServiceHandler.getAllBooks(req, res, next);
    } catch (error) {
      // TODO: use logger
      console.log(error);
    }
  }
}
