import { TrialDatabase } from "./db1";
import { BookModel, UserModel } from "./db_setup";

const UserModelType = typeof UserModel;

export class User {
    email: string | null | undefined;
    password: string | null | undefined;
    name: string | null | undefined;
}
export class Book {
    name: string | null | undefined;
    hash: string | null | undefined;
    isRented: boolean | null | undefined;
    startDate: string | null | undefined;
    endDate: string | null | undefined;
    rentedBy: string | null | undefined;
}

export default class TrialDatabaseImpl implements TrialDatabase {
    async create<T extends User | Book>(param: T): Promise<void> {
        if (param instanceof User) {
            const { email, password, name } = param;
            const existingUser = await UserModel.findOne({ email: email });

            if (existingUser) throw new Error("user already exists");
            const user = new UserModel({
                email: email,
                password: password,
                name: name,
            });
            await user.save();
            return;
        } else {
            const { name, hash, isRented, startDate, endDate, rentedBy } = param;
            const existingBook = await BookModel.findOne({ name: name });
            if (existingBook) throw new Error("Book already exists");

            const book = new BookModel({
                name: name,
                hash: hash,
                isRented: isRented,
                startDate: startDate,
                endDate: endDate,
                rentedBy: rentedBy,
            });
            await book.save();
            return;
        }
    }
}
