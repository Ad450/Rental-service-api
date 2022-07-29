import { Book, User } from "./TrialDatabaseImpl";
export abstract class TrialDatabase {
    abstract create<T extends Book | User>(param: T): Promise<void>;
}
