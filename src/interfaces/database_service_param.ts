import { Document, LeanDocument } from "mongoose";
import { UserModel, BookModel } from "../db/db_setup"

export type DatabaseParam = {
    user: UserParam | null,
    rent: RentalParam | null,
    isUser: boolean,
}

export type UserParam = {
    email: string;
    password: string;
}

export type RentalParam = {
    name: string,
    hash: string,
    date: string | undefined,
    isRented: boolean,
}

export type UserFromDb = {
    id: any,
    email: string,
    password: string,
}

export type BookFromDb = {
    id: any,
    name: string,
    hash: string,
    date: string | undefined,
    isRented: boolean,
}

export type DbReturnType = {
    user: UserFromDb | null,
    rent: BookFromDb | null
}