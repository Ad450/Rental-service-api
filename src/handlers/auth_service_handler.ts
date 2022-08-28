import { NextFunction, Request, Response } from "express";
import {
  comparePasswords,
  encryptData,
  generateAccessToken,
  hashData,
} from "../core/helpers";
import { DatabaseParam, UserParam } from "../interfaces/database_service_param";
import ApiResponse from "../response_handlers/response_handler";
import Injector from "../di/injector";
import { UserDatabase } from "../db/postgresql/prisma_db";

export default class AuthServiceHandler {
  userDatabase: UserDatabase;

  constructor(userDatabase: UserDatabase) {
    this.userDatabase = userDatabase;
  }

  async signup(req: Request, res: Response, next: NextFunction): Promise<void> {
    // hash password with bycrypt and insert user data into db
    const encryptedPassword = await hashData(req.body.name, req.body.password);

    const userData: UserParam = {
      email: req.body.email,
      password: encryptedPassword,
      name: req.body.name,
    };
    try {
      const { email, password, name } = userData;
      console.log(email);

      await this.userDatabase.create({
        email: email!,
        password: password!,
        name: name!,
      });

      const accessToken = await generateAccessToken(req);
      res.setHeader("authorization", `Bearer ${accessToken}`);

      res
        .status(200)
        .set("content-type", "application/json")
        .json(userData)
        .end();
    } catch (error) {
      // testing
      console.log(error);

      res
        .status(500)
        .json(ApiResponse.responseJson((error as Object).toString()))
        .end();
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const accessToken = generateAccessToken(req);
      res.setHeader("authorization", `Bearer ${accessToken}`);
      res
        .status(200)
        .json(ApiResponse.responseJson(ApiResponse.responses.loginSuccessful))
        .end();
    } catch (error) {
      res
        .status(500)
        .json(ApiResponse.responseJson(ApiResponse.responses.serverError))
        .end();
    }
  }
}
