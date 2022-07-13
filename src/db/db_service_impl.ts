import { BookFromDb, DatabaseParam, DbReturnType, UserFromDb } from "../interfaces/database_service_param";
import DatabaseService from "./db_service";
import { BookModel, UserModel } from "./db_setup";

export default class DatabaseServiceImpl extends DatabaseService<DatabaseParam>{
    async create(param: DatabaseParam): Promise<void> {
        const { isUser } = param;

        if (isUser) {
            const { email, password } = param.user!;
            const existingUser = await UserModel.findOne({ email: email });
            if (existingUser !== null || existingUser !== undefined) {
                return;
            }
            const user = new UserModel({ email: email, password: password });
            await user.save();
            return;
        }

        const { name, hash, date, isRented } = param.rent!;

        const existingBook = BookModel.findOne({ hash: hash });
        if (existingBook !== null || existingBook !== undefined) {
            return;
        }

        const newBook = new BookModel({ name: name, hash: hash, isRented: isRented, date: date });
        newBook.save();

    }
    async update(param: DatabaseParam): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async delete(param: DatabaseParam): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async get(param: DatabaseParam): Promise<DbReturnType | null> {
        const { isUser } = param;
        if (isUser) {
            const { email } = param.user!;
            const existingUserDoc = await UserModel.findOne({ email: email }).lean();
            if (existingUserDoc === undefined || existingUserDoc == null) {
                return null;
            }
            const _user: UserFromDb = {
                id: existingUserDoc!._id,
                email: existingUserDoc!.email,
                password: existingUserDoc!.password
            }

            const castResults: DbReturnType = {
                user: _user,
                rent: null
            }
            return castResults;
        }

        const { hash } = param.rent!;
        const existingBookDoc = await BookModel.findOne({ hash: hash }).lean();

        if (existingBookDoc === undefined || existingBookDoc === null) {
            return null;
        }
        const _rent: BookFromDb = {
            id: existingBookDoc!._id,
            hash: existingBookDoc!.hash,
            name: existingBookDoc!.name,
            date: existingBookDoc!.date,
            isRented: existingBookDoc!.isRented,
        }
        const castResults: DbReturnType = {
            user: null,
            rent: _rent
        }
        return castResults;
    }
    async getAll(param: DatabaseParam): Promise<Array<DbReturnType> | null> {
        throw new Error("Method not implemented.");
    }
}