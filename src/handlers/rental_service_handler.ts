import { NextFunction, Request, Response } from "express";
import { encryptData as encryptPassword, hashData } from "../core/helpers";

import ApiResponse from "../response_handlers/response_handler";
import { BookDatabase, BookType } from "../db/postgresql/prisma_db";

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
    console.log(req.body);

    try {
      const book = await this.bookDatabase.retrieveOne(parseInt(req.body.id));

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
      const book = await this.bookDatabase.retrieveOne(Number(req.params.name));

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
      const book = await this.bookDatabase.retrieveOne(Number(req.params.name));

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

  async getAllBooks(req: Request, res: Response, next: NextFunction) {
    try {
      const books = await this.bookDatabase.retrieve();
      if (!books)
        res
          .status(500)
          .json(ApiResponse.responseJson(ApiResponse.responses.serverError))
          .end();
      else if (books.length === 0) {
        res
          .status(500)
          .json(ApiResponse.responseJson(ApiResponse.responses.serverError))
          .end();
      } else {
        res.status(200).json(JSON.stringify(books)).end();
      }
    } catch (error) {
      console.log(error);
    }
  }
}
