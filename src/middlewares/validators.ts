import assert from "assert";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { comparePasswords, hashData } from "../core/helpers";
import Injector from "../di/injector";
import ApiResponse from "../response_handlers/response_handler";

export type Auth = {
  isSignup: boolean;
  isLogin: boolean;
};

export type Rental = {
  isRental: boolean;
};

export const validateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const headers = req.headers["authorization"];
    if (headers === undefined || null) {
      res
        .status(401)
        .json(
          ApiResponse.responseJson(ApiResponse.responses.authorizationFailed)
        )
        .end();
    }
    /// the authorization header has two strings Bearer and the token
    /// [1] returns the token
    const token = headers!.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || "jwt");
    next();
  } catch (error) {
    res
      .status(401)
      .json(ApiResponse.responseJson(ApiResponse.responses.authorizationFailed))
      .end();
  }
};

export const validateRentalInput = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    assert(req.body.name !== undefined || null);
    assert(req.body.startDate !== undefined || null);
    assert(req.body.endDate !== undefined || null);
    assert(req.body.password !== undefined || null);
    assert(req.body.id !== null || undefined);

    next();
  } catch (error) {
    res
      .status(401)
      .json(ApiResponse.responseJson(ApiResponse.responses.invalidInputData))
      .end();
  }
};

export const validateAuthInput = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // assert((req.body as Map<any, any>).has("name"));
    // assert((req.body as Map<any, any>).has("email"));
    // assert((req.body as Map<any, any>).has("password"));
    assert(req.body.name !== undefined || null);
    assert(req.body.email !== undefined || null);
    assert(req.body.password !== undefined || null);

    next();
  } catch (error) {
    res
      .status(401)
      .json(ApiResponse.responseJson(ApiResponse.responses.invalidAuthInput))
      .end();
  }
};

export const refineAuthInput = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  /// Name with at least 4 digits
  /// Name without special characters ^ < > ( ) \[ \] \\\ / . , ; : \s @ ’
  /// E-mail must have @
  /// Domain name with at least 4 digits
  /// Domain name without special characters ^ < > ( ) \[ \] \\\ / . , ; : \s @ ’
  /// Domain extension only .com or .net
  const emailRegex: RegExp =
    /([A-Z]|[a-z]|[^<>()\[\]\\\/.,;:\s@"]){4,}\@([A-Z]|[a-z]|[^<>()\[\]\\\/.,;:\s@"]){4,}\.(com|net)/;
  /// Password at least 6 digits.
  /// At least one lowercase
  /// At least one uppercase
  /// At least one special character from @ # $ % ^ & *
  const passwordRegex: RegExp =
    /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/;

  if (
    !emailRegex.test(req.body.email) ||
    !passwordRegex.test(req.body.password)
  ) {
    if (
      !emailRegex.test(req.body.email) &&
      !passwordRegex.test(req.body.password)
    ) {
      res
        .status(401)
        .json(
          ApiResponse.responseJson(ApiResponse.responses.invalidCredentials)
        )
        .end();
    } else if (!passwordRegex.test(req.body.password)) {
      res
        .status(401)
        .json(ApiResponse.responseJson(ApiResponse.responses.invalidPassword))
        .end();
    } else if (!emailRegex.test(req.body.email)) {
      res
        .status(401)
        .json(ApiResponse.responseJson(ApiResponse.responses.invalidEmail))
        .end();
    } else {
      res
        .status(401)
        .json(
          ApiResponse.responseJson(ApiResponse.responses.invalidCredentials)
        )
        .end();
    }
  } else {
    next();
  }
};

export const validateLoginPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const requestPassword = req.body.password;

  /// Only email is used by db to retrieve user
  /// Other params exist to prevent missing params compilation error
  const user = await Injector.userDatabase.retrieveOne(Number(req.params.id));

  if (user === null || user === undefined) {
    res
      .status(404)
      .json(ApiResponse.responseJson(ApiResponse.responses.userNotFound))
      .end();
  } else {
    try {
      const oldPassword = user!.password;
      const newPassword = req.body.password;

      const isMatch = await comparePasswords(newPassword, oldPassword);
      if (!isMatch) {
        res
          .status(404)
          .json(ApiResponse.responseJson(ApiResponse.responses.invalidLogin))
          .end();
      } else {
        next();
      }
    } catch (error) {
      res
        .status(500)
        .json(ApiResponse.responseJson(ApiResponse.responses.serverError))
        .end();
    }
  }
};
export async function validateRequestParams(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.params === null) {
    res
      .status(404)
      .json(ApiResponse.responseJson(ApiResponse.responses.invalidParam))
      .end();
  } else {
    next();
  }
}
