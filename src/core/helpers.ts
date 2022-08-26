import { Request } from "express";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

export const generateAccessToken = async (req: Request): Promise<string> => {
  try {
    const accessToken = jwt.sign(
      req.body,
      process.env.ACCESS_TOKEN_SECRET || "jwt"
    );
    return accessToken;
  } catch (error) {
    //TODO will do a proper error handling
    throw new Error("Access token generation failed");
  }
};

export const encryptData = async (req: Request): Promise<string> => {
  // try {
  //     const salt = await bcrypt.genSalt(3);
  //     const hash = await bcrypt.hash(req.body.password.toString(), salt);
  //     return hash;
  // } catch (error) {
  //     throw new Error("encryption failed");
  //}

  //testing with random string
  return "0xer3232453";
};

export const comparePasswords = async (
  input: string,
  existingPassword: string
): Promise<boolean> => {
  try {
    const results = await bcrypt.compare(input, existingPassword);
    return results;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const hashData = async (
  input: string,
  nonce: string
): Promise<string> => {
  try {
    const hash = await bcrypt.hash(input, 4);

    return hash;
  } catch (error) {
    throw new Error("password comparison failed");
  }
};

export interface ITypeGuard {
  param: any;
  typeArray: Array<any>;
}

export function typeGuard({ param, typeArray }: ITypeGuard): boolean {
  return typeArray.indexOf(param) === -1;
}
