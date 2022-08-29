export type UserType = {
  name: string;
  email: string;
  password: string;
};

export type BookType = {
  name: string;
  hash: string;
  startDate: string | null;
  endDate: string | null;
  rented: boolean;
  rentedBy: string | null;
};

export abstract class Database<K, Y> {
  abstract create<T extends K>(param: T): Promise<void>;
  abstract update<T extends K>(param: T): Promise<void>;
  abstract delete<T extends K>(param: T): Promise<void>;
  abstract retrieve(): Promise<Array<Y> | null>;
  abstract retrieveOne(id: number | string): Promise<Y | null>;
}
