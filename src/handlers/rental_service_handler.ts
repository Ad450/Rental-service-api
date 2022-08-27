import { NextFunction, Request, Response } from "express";
import { encryptData as encryptPassword, hashData } from "../core/helpers";
import {
  DatabaseParam,
  BookFromDb,
} from "../interfaces/database_service_param";
import ApiResponse from "../response_handlers/response_handler";
import Injector from "../di/injector";
import { BookDatabase, BookType } from "../db/prisma_db";
import { Book } from "../db/TrialDatabaseImpl";

export default class RentalServiceHandler {
  bookDatabase: BookDatabase;

  constructor(bookDatabase: BookDatabase) {
    this.bookDatabase = bookDatabase;
  }

  async rentBook(req: Request, res: Response, next: NextFunction) {
    const encryptedPassword = await hashData(
      req.body.password,
      req.body.startDate
    );
    const hash = await hashData(req.body.name, req.body.name);

    try {
      const book = await this.bookDatabase.retrieveOne({
        name: req.body.name,
        hash: hash,
        /// params below are not needed to retrieve book
        /// exist to escape missing params in type rent: RentalParams
        rented: true,
        rentedBy: encryptedPassword,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
      });

      if (book === null || undefined) {
        this.bookDatabase.create({
          name: req.body.name,
          hash: hash,
          rented: true,
          rentedBy: encryptedPassword,
          startDate: req.body.startDate,
          endDate: req.body.endDate,
        });
      } else if (book) {
        this.bookDatabase.update({
          name: req.body.name,
          hash: hash,
          rented: true,
          rentedBy: encryptedPassword,
          startDate: req.body.startDate,
          endDate: req.body.endDate,
        });
      }

      res
        .status(200)
        .json(ApiResponse.responseJson(ApiResponse.responses.bookRented))
        .end();
    } catch (error) {
      console.log(error);

      res
        .status(500)
        .json(ApiResponse.responseJson(ApiResponse.responses.serverError))
        .end();
    }
  }

  async turnInBook(req: Request, res: Response) {
    const hash = await hashData(req.body.password, req.body.startDate);

    try {
      const book = await this.bookDatabase.retrieveOne({
        name: req.body.name,
        hash: hash,
        /// params below are not necessary needed to retrieve book
        rented: false,
        rentedBy: "",
        startDate: "",
        endDate: "",
      });

      if (!book) {
        res
          .status(200)
          .json(ApiResponse.responseJson(ApiResponse.responses.bookNotFound))
          .end();
      } else {
        await this.bookDatabase.update({
          name: req.body.name,
          hash: hash,
          rented: false,
          rentedBy: "", /// clear up all data relating to previous user
          startDate: "", /// thereby all relating fields are set to empty string values
          endDate: "",
        });
        res
          .status(200)
          .json(ApiResponse.responseJson(ApiResponse.responses.bookHandedIn));
      }
    } catch (error) {
      res
        .status(500)
        .json(ApiResponse.responseJson(ApiResponse.responses.serverError));
    }
  }

  async getBook(req: Request, res: Response): Promise<BookType | null> {
    const encryptedPassword = await encryptPassword(req);
    const hash = await hashData(req.body.password, req.body.startDate);
    try {
      const book = await this.bookDatabase.retrieveOne({
        name: req.body.name,
        hash: hash,
        // params below not needed to retrieve book
        rented: false,
        rentedBy: encryptedPassword,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
      });

      if (book === null || undefined) {
        res
          .status(500)
          .json(ApiResponse.responseJson(ApiResponse.responses.serverError))
          .end();
        return null;
      } else {
        res.status(200).json(JSON.stringify(book)).end();
        return book;
      }
    } catch (error) {
      res
        .status(500)
        .json(ApiResponse.responseJson(ApiResponse.responses.serverError));
      return null;
    }
  }
}
