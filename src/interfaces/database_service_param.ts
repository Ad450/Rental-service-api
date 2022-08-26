import { Document, LeanDocument } from "mongoose";
import { UserModel, BookModel } from "../db/db_setup";

export type DatabaseParam = {
  user: UserParam | null;
  rent: RentalParam | null;
  isUser: boolean;
};

export type UserParam = {
  email: string | null | undefined;
  password: string | null | undefined;
  name: string | null | undefined;
};

export type RentalParam = {
  name: string | null | undefined;
  hash: string | null | undefined;
  isRented: boolean | null | undefined;
  startDate: string | null | undefined;
  endDate: string | null | undefined;
  rentedBy: string | null | undefined;
};

export type UserFromDb = {
  id: any;
  email: string;
  password: string;
};

export type BookFromDb = {
  id: any;
  name: string;
  hash: string;
  startDate: string | null | undefined;
  endDate: string | null | undefined;
  rented: boolean | null;
  rentedBy: string;
};

export type DbReturnType = {
  user: UserFromDb | null;
  rent: BookFromDb | null;
};
